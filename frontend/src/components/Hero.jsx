
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-eco-light/30 rounded-full filter blur-3xl opacity-60 animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-water-light/30 rounded-full filter blur-3xl opacity-60 animate-float delay-500"></div>
      </div>

      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <div className="inline-flex rounded-full px-3 py-1 text-sm bg-primary/10 text-primary w-max">
              Sustainable Future
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              Recycling Made <span className="text-primary">Simple</span>
            </h1>
            
            <p className="text-lg text-foreground/80 max-w-md animate-fade-in delay-200">
              Find recycling centers near you, request pickups, and connect directly with recyclers. 
              Join our community to make a positive impact on the environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in delay-300">
              <Link to="/recycling-centers">
                <Button size="lg" className="rounded-full px-6 group">
                  Find Centers 
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/create-request">
                <Button size="lg" variant="outline" className="rounded-full px-6">
                  Request Pickup
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Floating elements */}
              <div className="absolute -top-10 left-0 md:-left-10 w-24 h-24 bg-eco/10 rounded-xl backdrop-blur-sm p-4 shadow-neo animate-float z-10">
                <div className="w-full h-full bg-eco/20 rounded-lg flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco-dark w-6 h-6">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.29 7 12 12 20.71 7"></polyline>
                      <line x1="12" y1="22" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/3 -right-4 md:-right-12 w-28 h-28 bg-water/10 rounded-xl backdrop-blur-sm p-4 shadow-neo animate-float delay-300 z-10">
                <div className="w-full h-full bg-water/20 rounded-lg flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-water-light flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-water-dark w-6 h-6">
                      <path d="M5 11a7 7 0 0 1 14 0m-2.29-7.7L12 9 7.3 3.3"></path>
                      <path d="M5 11a7 7 0 0 0 14 0m-2.29 7.7L12 13l-4.7 5.7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 left-12 w-32 h-32 bg-white/80 rounded-xl backdrop-blur-sm p-5 shadow-neo animate-float delay-700 z-10">
                <div className="w-full h-full bg-gradient-to-br from-eco-light/50 to-water-light/50 rounded-lg flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground w-8 h-8">
                      <path d="M8 3H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 4.52 3 5.08 3 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 21 5.08 21 6.2 21h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 19.48 21 18.92 21 17.8V16M17 10l4-4m0 0h-4m4 0v4M9.5 11l1.5 1.5m-5-1.5L7.5 9m1.5 2.5h.01M11 13l-1 1"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Main image */}
              <div className="relative glass rounded-2xl overflow-hidden shadow-neo w-full h-full animate-fade-in delay-100">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                
                {/* Image inside with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/70"></div>
                
                <div className="absolute inset-6 rounded-xl bg-eco-light/20 backdrop-blur-sm flex items-center justify-center animate-pulse-soft delay-300">
                  <div className="text-center p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto mb-4 text-primary">
                      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.9a.25.25 0 0 0-.044-.28l-4.05-4.05a1.739 1.739 0 0 1 0-2.46 1.74 1.74 0 0 1 2.458 0l4.05 4.05a.25.25 0 0 0 .281.043l6.436-3.954a1.785 1.785 0 0 1 1.784.004c.506.369.83.95.883 1.57L19 7"></path>
                      <path d="M11 15h5a2 2 0 0 0 2-2v-2m-4-2a2 2 0 1 0 4 0 2 2 0 1 0-4 0"></path>
                      <path d="M15.172 14.828a4 4 0 1 0 5.656 5.656A4 4 0 0 0 17 20a4 4 0 0 0-2-3.485"></path>
                      <path d="M19 17v.01"></path>
                    </svg>
                    <h3 className="text-2xl font-semibold text-foreground">Eco-Connect App</h3>
                    <p className="text-foreground/70 mt-2">Connecting people to recycling solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
