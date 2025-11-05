import { Link } from 'react-router-dom';
import {
  Twitter,
  Linkedin,
  Github,
  Instagram,
  MessageCircle,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Rocket,
  Zap,
  Send,
  Heart,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    { name: 'AI Automation', link: '/services#automation', icon: Zap },
    { name: 'AI Chatbots', link: '/services#chatbot', icon: MessageCircle },
    { name: 'Data Analytics', link: '/services#analytics', icon: Sparkles },
    { name: 'Custom Solutions', link: '/services#custom', icon: Rocket }
  ];

  const company = [
    { name: 'About Us', link: '/about' },
    { name: 'Our Team', link: '/about#team' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact', link: '/contact' }
  ];

  const resources = [
    { name: 'Blog', link: '/blog' },
    { name: 'Documentation', link: '/documentation' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Support', link: '/support' }
  ];

  const socialLinks = [
    { icon: Twitter, link: '#', label: 'Twitter', color: 'hover:text-sky-400 hover:bg-sky-400/10' },
    { icon: Linkedin, link: 'https://www.linkedin.com/company/aether-mind/', label: 'LinkedIn', color: 'hover:text-blue-500 hover:bg-blue-500/10' },
    { icon: Github, link: 'https://github.com/SatyamSingh8306/aethermind', label: 'GitHub', color: 'hover:text-cyan-300 hover:bg-cyan-300/10' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-blue-950/30 to-black overflow-hidden">

      {/* Animated Background Elements - Blue Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDE5MSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div className="group cursor-pointer">
                <div className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-[length:200%_auto] animate-gradient">
                      Aether
                    </span>
                  </div>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 bg-[length:200%_auto] animate-gradient">
                    Mind
                  </span>
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed max-w-sm">
                Empowering businesses with intelligent AI solutions for automation and innovation. Transform your future with cutting-edge technology.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                <a href="mailto:aethermindagenticai@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300 group-hover:scale-110 border border-cyan-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">aethermindagenticai@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Services
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.link}
                      className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <service.icon className="w-3.5 h-3.5 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Company
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {company.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Resources
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {resources.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:translate-x-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
                Connect
                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`group relative w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-cyan-500/20 ${social.color} transition-all duration-300 hover:scale-110 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20`}
                  >
                    <social.icon className="w-5 h-5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                ))}
              </div>

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="mt-8 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group border border-cyan-400/30"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>

          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1.5">
              &copy; {currentYear} <span className="text-cyan-400 font-semibold">AetherMind</span>. All rights reserved. Crafted by AetherMind Team
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
              >
                Cookie Policy
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .delay-700 {
          animation-delay: 700ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </footer>
  );
};

export default Footer;