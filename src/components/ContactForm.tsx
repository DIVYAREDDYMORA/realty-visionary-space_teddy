
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'buying'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success notification
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll be in touch soon!",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interest: 'buying'
    });
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black",
              "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
            )}
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black",
              "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
            )}
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black",
              "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
            )}
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
            I'm interested in
          </label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black",
              "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
            )}
          >
            <option value="buying">Buying a property</option>
            <option value="selling">Selling a property</option>
            <option value="renting">Renting a property</option>
            <option value="investing">Investment opportunities</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className={cn(
            "w-full px-4 py-3 rounded-md border border-gray-300 focus:border-black",
            "focus:ring-1 focus:ring-black focus:outline-none transition-all duration-200"
          )}
          placeholder="Please let us know how we can help you..."
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full bg-black text-white py-3 px-6 rounded-md font-medium",
          "transition-all duration-300 transform hover:translate-y-[-2px]",
          "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
          isSubmitting && "opacity-70 cursor-not-allowed"
        )}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
