import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundAnimation from '../../components/BackgroundAnimation';
import {
    fetchProducts,
    createPaymentOrder,
    verifyPayment,
    createIntegrationIntent,
    createReminder,
    createPurchase
} from '../../services/api';
import { formatInr } from '../../utils/currency';

const ProductSetupPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sp] = useSearchParams();

    const [product, setProduct] = useState(null);
    const [quantity] = useState(Number(sp.get('qty') || 1));

    const [step, setStep] = useState(1);
    const [isPaying, setIsPaying] = useState(false);
    const [paidInfo, setPaidInfo] = useState(null);

    // Integration form state
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        useCase: '',
        env: 'sandbox',
        method: 'api',
        callbackUrl: '',
        stack: 'react-node',
        notes: ''
    });

    // Reminder state for coming-soon products
    const [remind, setRemind] = useState({
        email: '',
        channel: 'email',
        whenLive: true,
        remindOn: ''
    });

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const apiProducts = await fetchProducts();
                const root = Array.isArray(apiProducts)
                    ? apiProducts
                    : (apiProducts?.products || apiProducts?.data || apiProducts?.items || []);
                const list = root.map((p, idx) => ({
                    id: p.productId ?? p.id ?? p._id ?? idx,
                    name: p.name ?? 'Untitled',
                    description: p.description ?? '',
                    price: Number(p.price ?? 0),
                    image: p.image ?? '',
                    category: p.category ?? 'General',
                    features: Array.isArray(p.features) ? p.features : [],
                    status: p.status ?? 'live',
                    serviceUrl: p.serviceUrl ?? ''
                }));
                const found = list.find(p => String(p.id) === String(id));
                if (mounted) {
                    if (found) setProduct(found);
                    else navigate('/products');
                }
            } catch (error) {
                console.error('Failed to load product:', error);
                alert('Failed to load product details. Redirecting to products page.');
                navigate('/products');
            }
        };
        load();
        return () => { mounted = false; };
    }, [id, navigate]);

    const isComingSoon = useMemo(() => {
        const s = product?.status?.toLowerCase?.() || 'live';
        return s !== 'live';
    }, [product]);

    const loadRazorpay = () => new Promise((resolve, reject) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Failed to load Razorpay'));
        document.body.appendChild(script);
    });

    const handlePay = async (mode) => {
        if (!product) return;

        if (!product.price || product.price <= 0) {
            try {
                setIsPaying(true);
                const purchase = await createPurchase(product.id, {
                    source: 'setup-page-free',
                    quantity,
                    paymentMode: 'free'
                });
                setPaidInfo({ orderId: 'free', paymentId: purchase?.purchase?._id || 'free', amount: 0 });
                setStep(2);
            } catch (e) {
                alert(e.message || 'Failed to create free purchase');
            } finally {
                setIsPaying(false);
            }
            return;
        }

        try {
            setIsPaying(true);
            await loadRazorpay();

            const amountPaise = mode === 'token'
                ? 100
                : Math.max(1, Math.round(product.price * quantity * 100));

            let orderData;
            try {
                orderData = await createPaymentOrder(product.id, {
                    amountPaise,
                    meta: { mode, qty: quantity }
                });
            } catch {
                orderData = await createPaymentOrder(product.id);
            }

            const keyId = orderData.keyId;
            const order = orderData.order;

            const options = {
                key: keyId,
                amount: order.amount,
                currency: order.currency || 'INR',
                name: 'AetherMind',
                description: `${product.name} (${mode === 'token' ? 'Token' : 'Full'})`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const result = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            productId: product.id,
                            meta: { mode, qty: quantity }
                        });

                        setPaidInfo({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount: order.amount
                        });

                        if (result.clientId && (product.id === 101 || product.name?.toLowerCase().includes('chatbot'))) {
                            navigate(`/setup-prompt?clientId=${result.clientId}`);
                        } else {
                            setStep(2);
                        }
                    } catch (e) {
                        alert(e.message || 'Payment verification failed');
                    }
                },
                modal: {
                    ondismiss: () => {
                        setIsPaying(false);
                        console.log('Payment modal dismissed by user');
                    }
                },
                theme: { color: '#6366F1' }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (e) {
            alert(e.message || 'Unable to initiate payment');
        } finally {
            setIsPaying(false);
        }
    };

    const handleSubmitIntegration = async (e) => {
        e.preventDefault();
        if (!product) return;

        if (!form.name || !form.email) {
            alert('Please fill name and email');
            return;
        }

        try {
            await createIntegrationIntent(product.id, {
                ...form,
                quantity,
                paidOrderId: paidInfo?.orderId || null,
                paymentId: paidInfo?.paymentId || null
            });

            alert('Thanks! Your integration request has been received. We’ll reach out shortly.');
            navigate('/dashboard');
        } catch (e) {
            alert(e.message || 'Failed to submit integration details');
        }
    };

    const handleSubmitReminder = async (e) => {
        e.preventDefault();
        if (!product) return;

        try {
            await createReminder(product.id, {
                email: remind.email,
                channel: remind.channel,
                whenLive: remind.whenLive,
                remindOn: remind.whenLive ? null : (remind.remindOn ? new Date(remind.remindOn).toISOString() : null)
            });

            alert('Great! We’ll remind you.');
            navigate('/products');
        } catch (e) {
            alert(e.message || 'Failed to create reminder');
        }
    };

    if (!product) return null;

    return (
        <div className="min-h-screen text-white relative overflow-hidden">
            <BackgroundAnimation />

            <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-10">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full px-3 py-1 mb-2 text-xs">
                            <span>{product.category}</span>
                            {isComingSoon && <span className="text-yellow-400">Coming Soon</span>}
                        </div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-400 max-w-2xl mt-1">{product.description}</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm"
                    >
                        Back
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Summary card */}
                    <div className="lg:col-span-4">
                        <div className="bg-gray-900/70 border border-gray-700 rounded-xl p-4">
                            <img
                                src={product.image || '/images/product-placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-40 object-contain mb-3 rounded"
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Price</p>
                                    <p className="text-xl font-bold text-indigo-400">
                                        {formatInr(product.price)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 text-right">Quantity</p>
                                    <p className="text-lg font-semibold text-right">{quantity}</p>
                                </div>
                            </div>
                            {!isComingSoon && (
                                <div className="flex items-center justify-between mt-2 border-t border-gray-800 pt-2">
                                    <span className="text-xs text-gray-400">Total</span>
                                    <span className="text-lg font-bold text-indigo-400">
                                        {formatInr(product.price * quantity)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="lg:col-span-8">
                        {!isComingSoon ? (
                            <>
                                {/* Stepper */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`h-2 flex-1 rounded ${step >= 1 ? 'bg-indigo-500' : 'bg-gray-700'}`} />
                                    <div className={`h-2 flex-1 rounded ${step >= 2 ? 'bg-indigo-500' : 'bg-gray-700'}`} />
                                </div>

                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-900/70 border border-gray-700 rounded-xl p-4"
                                    >
                                        <h2 className="text-lg font-semibold mb-3">Payment</h2>

                                        {product.price > 0 ? (
                                            <>
                                                <p className="text-sm text-gray-400 mb-4">
                                                    Choose how you’d like to proceed. You can pay the full amount now to kick off integration and complete payment later.
                                                </p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => handlePay('full')}
                                                        disabled={isPaying}
                                                        className={`px-4 py-3 rounded-lg ${isPaying ? 'bg-gray-700' : 'bg-purple-600 hover:bg-purple-700'} text-sm font-medium`}
                                                    >
                                                        Pay Full {formatInr(product.price * quantity)}
                                                    </button>
                                                    {/* <button
                                                        onClick={() => handlePay('token')}
                                                        disabled={isPaying}
                                                        className={`px-4 py-3 rounded-lg ${isPaying ? 'bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-sm font-medium`}
                                                    >
                                                        Pay Token ₹1 and Continue
                                                    </button> */}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-3">
                                                    Secure payments via Razorpay.
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="text-sm text-gray-400 mb-4">
                                                    This product is free. No payment required — continue to integration.
                                                </p>
                                                <div className="flex justify-start">
                                                    <button
                                                        onClick={() => handlePay('full')}
                                                        disabled={isPaying}
                                                        className={`px-4 py-3 rounded-lg ${isPaying ? 'bg-gray-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-sm font-medium`}
                                                    >
                                                        Continue to Integration
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-gray-900/70 border border-gray-700 rounded-xl p-4"
                                    >
                                        <h2 className="text-lg font-semibold mb-3">Integration details</h2>
                                        <form onSubmit={handleSubmitIntegration} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Full name *"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                required
                                            />
                                            <input
                                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Email *"
                                                type="email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                required
                                            />
                                            <input
                                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Phone"
                                                value={form.phone}
                                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                            />
                                            <input
                                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Company"
                                                value={form.company}
                                                onChange={e => setForm({ ...form, company: e.target.value })}
                                            />

                                            <input
                                                className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Use case (what do you want to build?)"
                                                value={form.useCase}
                                                onChange={e => setForm({ ...form, useCase: e.target.value })}
                                            />

                                            <div className="flex gap-2">
                                                <select
                                                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm flex-1"
                                                    value={form.env}
                                                    onChange={e => setForm({ ...form, env: e.target.value })}
                                                >
                                                    <option value="sandbox">Sandbox</option>
                                                    <option value="production">Production</option>
                                                </select>
                                                <select
                                                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm flex-1"
                                                    value={form.method}
                                                    onChange={e => setForm({ ...form, method: e.target.value })}
                                                >
                                                    <option value="api">REST API</option>
                                                    <option value="sdk">SDK</option>
                                                    <option value="webhook">Webhook</option>
                                                </select>
                                            </div>

                                            <input
                                                className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                placeholder="Callback / Redirect URL (if any)"
                                                value={form.callbackUrl}
                                                onChange={e => setForm({ ...form, callbackUrl: e.target.value })}
                                            />

                                            <select
                                                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                value={form.stack}
                                                onChange={e => setForm({ ...form, stack: e.target.value })}
                                            >
                                                <option value="react-node">React + Node</option>
                                                <option value="next-node">Next.js + Node</option>
                                                <option value="python">Python</option>
                                                <option value="java">Java</option>
                                                <option value="other">Other</option>
                                            </select>

                                            <textarea
                                                className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                rows={4}
                                                placeholder="Any additional context, repository link, IP allowlist, etc."
                                                value={form.notes}
                                                onChange={e => setForm({ ...form, notes: e.target.value })}
                                            />

                                            <div className="md:col-span-2 flex items-center justify-between gap-3">
                                                {paidInfo ? (
                                                    <div className="text-xs text-green-400">
                                                        Payment captured. Order: {paidInfo.orderId?.slice(0, 10)}… Amount: {formatInr((paidInfo.amount || 0) / 100)}
                                                    </div>
                                                ) : (
                                                    <div className="text-xs text-yellow-400">
                                                        Note: If you selected token payment or haven’t paid yet, we’ll still start integration and coordinate the balance payment later.
                                                    </div>
                                                )}
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium"
                                                >
                                                    Submit details
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-900/70 border border-gray-700 rounded-xl p-4"
                            >
                                <h2 className="text-lg font-semibold mb-3">Join Waitlist & Set Reminder</h2>
                                <form onSubmit={handleSubmitReminder} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                        placeholder="Email *"
                                        type="email"
                                        value={remind.email}
                                        onChange={(e) => setRemind({ ...remind, email: e.target.value })}
                                        required
                                    />
                                    <select
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                        value={remind.channel}
                                        onChange={(e) => setRemind({ ...remind, channel: e.target.value })}
                                    >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="whatsapp">WhatsApp</option>
                                    </select>

                                    <div className="md:col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={remind.whenLive}
                                                onChange={(e) => setRemind({ ...remind, whenLive: e.target.checked })}
                                            />
                                            Notify me when this product goes live
                                        </label>

                                        {!remind.whenLive && (
                                            <div className="mt-2">
                                                <label className="text-xs text-gray-400 block mb-1">Or pick a date & time</label>
                                                <input
                                                    type="datetime-local"
                                                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                                                    value={remind.remindOn}
                                                    onChange={(e) => setRemind({ ...remind, remindOn: e.target.value })}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2 flex justify-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm font-medium"
                                        >
                                            Save reminder
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSetupPage;