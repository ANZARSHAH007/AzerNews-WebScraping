import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Users, Globe, Award, Mail, Phone, MapPin } from 'lucide-react';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Newspaper size={64} className="mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About AzerNews
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your trusted source for comprehensive news coverage from Azerbaijan and around the world. 
              We deliver accurate, timely, and insightful journalism that keeps you informed about 
              what matters most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At AzerNews, we are committed to delivering high-quality journalism that informs, 
                educates, and empowers our readers. We believe in the power of accurate reporting 
                to foster understanding and promote positive change in our society.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of dedicated journalists works tirelessly to bring you the most important 
                stories from Azerbaijan, the region, and beyond, ensuring you stay connected to 
                the events that shape our world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="text-blue-600" size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Global Coverage</h3>
                    <p className="text-sm text-gray-600">Worldwide news perspective</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-red-600" size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Quality Journalism</h3>
                    <p className="text-sm text-gray-600">Award-winning reporting</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-yellow-600" size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Team</h3>
                    <p className="text-sm text-gray-600">Professional journalists</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Newspaper className="text-green-600" size={32} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">24/7 Updates</h3>
                    <p className="text-sm text-gray-600">Real-time news delivery</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at AzerNews
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Accuracy",
                description: "We are committed to factual, verified reporting that you can trust.",
                icon: "🎯"
              },
              {
                title: "Independence",
                description: "Our editorial integrity remains free from external influence.",
                icon: "🗽"
              },
              {
                title: "Transparency",
                description: "We believe in open, honest communication with our readers.",
                icon: "🔍"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="bg-gray-50 rounded-xl p-8 text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              We'd love to hear from you. Reach out to our team anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="text-blue-600" size={32} />,
                title: "Email Us",
                info: "info@azernews.az",
                link: "mailto:info@azernews.az"
              },
              {
                icon: <Phone className="text-green-600" size={32} />,
                title: "Call Us",
                info: "+994 12 345 67 89",
                link: "tel:+994123456789"
              },
              {
                icon: <MapPin className="text-red-600" size={32} />,
                title: "Visit Us",
                info: "Baku, Azerbaijan",
                link: "#"
              }
            ].map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                className="bg-white rounded-xl p-8 text-center shadow-lg"
              >
                <div className="mb-4">{contact.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {contact.info}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;