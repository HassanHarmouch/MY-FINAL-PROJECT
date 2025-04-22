import React from 'react';
import { MapPin, Package, ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { Button } from '../components/button';
import { Link } from 'react-router-dom';

const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-eco" />,
      title: 'Find Recycling Centers',
      description:
        'Easily locate nearby recycling centers based on your location and the materials you want to recycle.',
      link: '/find-centers',
      delay: 'delay-100',
    },
    {
      icon: <Package className="h-8 w-8 text-water" />,
      title: 'Request Pickups',
      description:
        'Schedule convenient pickups for your recyclables directly from your home or office.',
      link: '/recycle-request',
      delay: 'delay-300',
    },
    {
      icon: (
        <svg
          className="h-8 w-8 text-eco-dark"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10L12 14L16 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 14V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 16V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Direct Communication',
      description:
        'Connect directly with recycling centers through phone or WhatsApp without any intermediaries.',
      link: '/about',
      delay: 'delay-500',
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How <span className="text-primary">EcoConnect</span> Works
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Our platform simplifies the recycling process by connecting you with
            recyclers and providing essential tools.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <AnimatedSection
              key={index}
              className="relative glass rounded-xl p-8 transition-all duration-300 hover:shadow-neo"
              delay={feature.delay}
            >
              <div className="absolute -top-5 -right-5 rounded-xl bg-white shadow-soft p-3">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-3">{feature.title}</h3>
              <p className="text-foreground/70 mb-6">{feature.description}</p>
              <Link
                to={feature.link}
                className="inline-flex items-center text-primary hover:text-primary-foreground hover:bg-primary rounded-full px-4 py-2 transition-all"
              >
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
