
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { agents } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="pt-24 pb-12 md:pt-32 md:pb-20 px-6 md:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're looking for your dream home, considering selling your property, or have questions about our services, we'd love to hear from you.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <ContactCard 
              icon={<Phone size={24} />}
              title="Phone"
              content="(800) 123-4567"
              description="Mon-Fri, 9am-6pm EST"
            />
            <ContactCard 
              icon={<Mail size={24} />}
              title="Email"
              content="info@dreamscape.com"
              description="We'll respond within 24 hours"
            />
            <ContactCard 
              icon={<MapPin size={24} />}
              title="Office"
              content="123 Luxury Lane"
              description="Beverly Hills, CA 90210"
            />
            <ContactCard 
              icon={<Clock size={24} />}
              title="Hours"
              content="Monday - Friday"
              description="9:00 AM - 6:00 PM"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
            
            {/* Map */}
            <div>
              <h2 className="text-2xl font-semibold mb-8">Visit Our Office</h2>
              <div className="h-96 bg-gray-200 rounded-lg overflow-hidden mb-6">
                <iframe
                  title="Office Location"
                  className="w-full h-full border-0"
                  src="https://maps.google.com/maps?q=Beverly%20Hills,%20CA%2090210&t=m&z=13&output=embed"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-600">
                Our office is conveniently located in the heart of Beverly Hills. We're easily accessible by car or public transportation, with ample parking available.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="py-16 px-6 md:px-10 lg:px-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced agents is dedicated to providing exceptional service and expert guidance for all your real estate needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{agent.name}</h3>
                  <p className="text-gray-500 mb-4">Luxury Property Specialist</p>
                  <p className="text-gray-600 mb-6">{agent.bio}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-800">{agent.phone}</span>
                    <a
                      href={`mailto:${agent.email}`}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {agent.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and the real estate process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl mx-auto">
            <FaqItem
              question="What areas do you service?"
              answer="We specialize in luxury properties throughout California, with a primary focus on Beverly Hills, Malibu, San Francisco, and other premium locations. Our team has extensive knowledge of these markets and can provide expert guidance on property values and neighborhood characteristics."
            />
            <FaqItem
              question="How do I schedule a property viewing?"
              answer="Scheduling a viewing is simple. You can contact us directly by phone, email, or through our website. We offer flexible viewing times, including evenings and weekends, and can arrange private showings for all properties in our portfolio."
            />
            <FaqItem
              question="What should I consider when buying a luxury property?"
              answer="When purchasing a luxury property, consider factors beyond just the property itself, such as location prestige, privacy, security features, architectural significance, and potential for value appreciation. Our experts can help you evaluate these aspects to make an informed decision."
            />
            <FaqItem
              question="Do you handle property management?"
              answer="Yes, we offer comprehensive property management services for luxury homes and investment properties. Our team can handle everything from tenant screening and rent collection to maintenance coordination and financial reporting."
            />
            <FaqItem
              question="How do you market luxury properties?"
              answer="Our marketing strategy for luxury properties includes professional photography and videography, virtual tours, targeted digital marketing, exclusive listings in premium publications, and access to our network of high-net-worth clients and investors."
            />
            <FaqItem
              question="What sets Dreamscape apart from other agencies?"
              answer="Dreamscape differentiates itself through our white-glove service approach, extensive market knowledge, exclusive off-market listings, and our commitment to discretion and confidentiality. We limit our client roster to ensure personalized attention for each relationship."
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

const ContactCard = ({ icon, title, content, description }: { 
  icon: React.ReactNode, 
  title: string, 
  content: string, 
  description: string 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
      <div className="p-3 bg-gray-50 rounded-full w-fit mb-4">
        <div className="text-gray-700">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-800 mb-1">{content}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};

export default Contact;
