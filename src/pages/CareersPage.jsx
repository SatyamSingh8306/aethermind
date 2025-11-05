import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';

const CareersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center text-white">
        <header className="mb-16 max-w-3xl">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl tracking-tight">
            Careers at <span className="text-indigo-400">AetherMind</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We’re building the future with intention. While we’re not hiring right now, we’d love to know you’re out there.
          </p>
        </header>

        <section className="w-full max-w-lg">
          <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-white mb-4">No roles open today</h2>
            <p className="text-slate-200 mb-8 leading-relaxed">
              We’ll post new opportunities here when the time is right. In the meantime, feel free to introduce yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg hover:shadow-indigo-500/20"
              >
                Say Hello
              </Link>
              <Link
                to="/about"
                className="px-6 py-3.5 border border-slate-400 text-slate-200 hover:bg-white/5 font-medium rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Our Story
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareersPage;
