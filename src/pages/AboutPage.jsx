import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ProfilePhoto from '../assets/profile_photo.jpg';
import TeamPhoto from '../assets/team_photo.png';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen">
      <BackgroundAnimation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About AetherMind
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a team of AI specialists dedicated to creating intelligent solutions
            that empower businesses to thrive in the digital age.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 transform transition-all duration-500 hover:scale-102 hover:shadow-2xl hover:border-purple-500/30">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  At AetherMind, we're on a mission to democratize artificial intelligence and make
                  advanced AI technologies accessible to businesses of all sizes. We believe that AI
                  should be a powerful tool that enhances human capabilities rather than replacing them.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our team of AI specialists, data scientists, and software engineers work together
                  to create solutions that are not only technically sophisticated but also practical,
                  ethical, and aligned with our clients' business objectives.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Founded in 2023, AetherMind has quickly established itself as a trusted partner for
                  businesses looking to harness the power of AI to drive innovation, efficiency, and growth.
                </p>
              </div>
              <div className="relative group">
                <div className="overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:rotate-2">
                  <img 
                    src={TeamPhoto} 
                    alt="AetherMind Team" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Values</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            These core principles guide everything we do at AetherMind.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl hover:border-purple-500/30 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-300">
                We constantly explore new technologies and approaches to solve complex problems.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-3 hover:-rotate-1 hover:shadow-2xl hover:border-blue-500/30 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Partnership</h3>
              <p className="text-gray-300">
                We work alongside our clients as true partners, invested in their success.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-3 hover:rotate-1 hover:shadow-2xl hover:border-green-500/30 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ethical AI</h3>
              <p className="text-gray-300">
                We develop AI solutions that uphold the highest ethical standards and promote fairness.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-300 hover:-translate-y-3 hover:-rotate-1 hover:shadow-2xl hover:border-yellow-500/30 group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-300">
                We are committed to delivering exceptional quality in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8" id="team">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Team</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Meet the minds behind AetherMind's innovative AI solutions.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-500 hover:-translate-y-4 hover:rotate-280 hover:scale-105 hover:shadow-2xl hover:border-purple-500/30 group">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-purple-400/50 transition-colors duration-300">
                  <img 
                    src={ProfilePhoto} 
                    alt="Satyam Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Satyam Singh</h3>
              <p className="text-purple-400 font-medium">Co-founder & CEO</p>
              <p className="text-gray-300 text-sm mt-2">
                Visionary leader with expertise in AI strategy and business development.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-500 hover:-translate-y-4 hover:rotate-280 hover:scale-105 hover:shadow-2xl hover:border-blue-500/30 group">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-blue-400/50 transition-colors duration-300">
                  <img 
                    src="https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg" 
                    alt="Shivam" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Shivam</h3>
              <p className="text-blue-400 font-medium">Co-founder & CTO</p>
              <p className="text-gray-300 text-sm mt-2">
                Technical expert specializing in AI architecture and system design.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-500 hover:-translate-y-4 hover:rotate-280 hover:scale-105 hover:shadow-2xl hover:border-green-500/30 group">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-green-400/50 transition-colors duration-300">
                  <img 
                    src={ProfilePhoto} 
                    alt="Lead AI Engineer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Lead AI Engineer</h3>
              <p className="text-green-400 font-medium">AI Research Lead</p>
              <p className="text-gray-300 text-sm mt-2">
                Pioneering new approaches in machine learning and neural networks.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 transform transition-all duration-500 hover:-translate-y-4 hover:rotate-280 hover:scale-105 hover:shadow-2xl hover:border-pink-500/30 group">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 group-hover:border-pink-400/50 transition-colors duration-300">
                  <img 
                    src={ProfilePhoto} 
                    alt="Product Head" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Product Head</h3>
              <p className="text-pink-400 font-medium">Head of Product</p>
              <p className="text-gray-300 text-sm mt-2">
                Driving product innovation and user experience excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10 text-center transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:border-purple-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our Team</h2>
            <p className="text-xl text-gray-300 mb-8">
              We're always looking for talented individuals who are passionate about AI and innovation.
            </p>
            <Link 
              to="/careers" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 inline-block transform hover:scale-110 hover:rotate-2"
            >
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
