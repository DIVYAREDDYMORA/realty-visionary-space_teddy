
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import Footer from '@/components/Footer';
import { properties, agents, testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, Star } from 'lucide-react';

const Index = () => {
  const [visibleElements, setVisibleElements] = useState<{ [key: string]: boolean }>({});
  const featuredProperties = properties.filter(property => property.isFeatured);
  const navigate = useNavigate();
  
  const sectionRefs = {
    features: useRef<HTMLDivElement>(null),
    properties: useRef<HTMLDivElement>(null),
    agents: useRef<HTMLDivElement>(null),
    testimonials: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleElements[id] || false;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Features Section */}
      <section 
        id="features" 
        ref={sectionRefs.features}
        className="py-24 px-6 md:px-10 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium bg-gray-100 py-1 px-3 rounded-full mb-4">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Experience Exceptional Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We combine industry expertise with a client-focused approach to deliver an unparalleled real estate experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Curated Selection",
                description: "We carefully curate our property offerings to ensure each one meets our exceptional standards for quality, location, and investment potential.",
                icon: "🏡",
                delay: 100,
              },
              {
                title: "Expert Guidance",
                description: "Our team of seasoned professionals provides personalized guidance throughout every step of your real estate journey.",
                icon: "📈",
                delay: 200,
              },
              {
                title: "White Glove Service",
                description: "Experience our signature concierge approach where every detail is meticulously managed to ensure a seamless process.",
                icon: "✨",
                delay: 300,
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={cn(
                  "bg-white p-8 rounded-xl border border-gray-100 transition-all duration-700 ease-out",
                  "hover:shadow-md hover:border-gray-200 transform hover:-translate-y-1",
                  isVisible("features") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="mb-5 text-3xl">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section 
        id="properties" 
        ref={sectionRefs.properties}
        className="py-24 px-6 md:px-10 lg:px-16 bg-gray-50"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="inline-block text-sm font-medium bg-gray-100 py-1 px-3 rounded-full mb-4">Featured Properties</span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Exceptional Homes</h2>
              <p className="text-gray-600 max-w-2xl">
                Discover a curated selection of our most distinctive properties that exemplify luxury living.
              </p>
            </div>
            <button 
              onClick={() => navigate('/properties')}
              className="mt-6 md:mt-0 group flex items-center text-gray-800 font-medium hover:text-black transition-colors"
            >
              View All Properties
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property, index) => (
              <div 
                key={property.id}
                className={cn(
                  "transition-all duration-700 ease-out",
                  isVisible("properties") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium bg-gray-100 py-1 px-3 rounded-full mb-4">The Process</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We've refined our process to ensure a seamless experience from first consultation to closing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin with a detailed consultation to understand your specific needs and preferences.",
              },
              {
                step: "02",
                title: "Property Matching",
                description: "Our team curates a selection of properties that align with your requirements and aspirations.",
              },
              {
                step: "03",
                title: "Guided Tours",
                description: "Experience personalized property tours with insights from our knowledgeable agents.",
              },
              {
                step: "04",
                title: "Seamless Closing",
                description: "We handle all details of the transaction process to ensure a smooth closing experience.",
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="mb-4 text-4xl font-light text-gray-200">{step.step}</div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 right-0 w-full h-0.5">
                    <div className="w-[calc(100%-2rem)] mx-auto h-px bg-gray-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={sectionRefs.testimonials}
        className="py-24 px-6 md:px-10 lg:px-16 bg-gray-50"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium bg-gray-100 py-1 px-3 rounded-full mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our satisfied clients about their experience working with Dreamscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "bg-white p-8 rounded-xl border border-gray-100 transition-all duration-700 ease-out",
                  "hover:shadow-md hover:border-gray-200",
                  isVisible("testimonials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Verified Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Agents Section */}
      <section 
        id="agents" 
        ref={sectionRefs.agents}
        className="py-24 px-6 md:px-10 lg:px-16"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium bg-gray-100 py-1 px-3 rounded-full mb-4">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Meet Our Agents</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced agents is dedicated to helping you achieve your real estate goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <div 
                key={agent.id}
                className={cn(
                  "transition-all duration-700 ease-out text-center",
                  isVisible("agents") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 relative group overflow-hidden rounded-xl">
                  <img 
                    src={agent.photo} 
                    alt={agent.name} 
                    className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-medium mb-1">{agent.name}</h3>
                <p className="text-gray-500 mb-4">Luxury Property Specialist</p>
                <p className="text-gray-600 mb-4">{agent.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={`mailto:${agent.email}`} className="text-gray-800 hover:text-black transition-colors">
                    {agent.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-10 lg:px-16 bg-black text-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Find Your Dream Property?</h2>
              <p className="text-gray-300 mb-8">
                Let us help you discover the perfect space that matches your lifestyle and aspirations.
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className={cn(
                  "bg-white text-black px-8 py-3 rounded-md font-medium",
                  "transition-all duration-300 transform hover:translate-y-[-2px]"
                )}
              >
                Contact Us Today
              </button>
            </div>
            <div className="space-y-6">
              {[
                "Personalized property consultations",
                "Exclusive access to off-market listings",
                "Comprehensive market analysis",
                "Expert negotiation on your behalf",
                "Seamless transaction management"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-white bg-opacity-10 p-1 rounded-full mr-3 mt-0.5">
                    <Check size={16} className="text-white" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
