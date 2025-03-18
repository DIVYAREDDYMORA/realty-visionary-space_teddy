
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-6">Dreamscape</h2>
            <p className="text-gray-600 mb-6 max-w-xs">
              Curating exceptional properties and delivering unparalleled real estate experiences for discerning clients.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="https://facebook.com" />
              <SocialLink icon={<Instagram size={18} />} href="https://instagram.com" />
              <SocialLink icon={<Twitter size={18} />} href="https://twitter.com" />
              <SocialLink icon={<Linkedin size={18} />} href="https://linkedin.com" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-widest mb-6 text-gray-500">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/properties" label="All Properties" />
              <FooterLink href="/contact" label="Contact Us" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
            </nav>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-widest mb-6 text-gray-500">Property Types</h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink href="/properties?type=luxury" label="Luxury Homes" />
              <FooterLink href="/properties?type=waterfront" label="Waterfront Properties" />
              <FooterLink href="/properties?type=penthouse" label="Penthouses" />
              <FooterLink href="/properties?type=estate" label="Estates & Land" />
              <FooterLink href="/properties?type=investment" label="Investment Properties" />
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-sm uppercase tracking-widest mb-6 text-gray-500">Contact Us</h3>
            <div className="space-y-4">
              <ContactItem icon={<MapPin size={18} />} text="123 Luxury Lane, Beverly Hills, CA 90210" />
              <ContactItem icon={<Phone size={18} />} text="(800) 123-4567" />
              <ContactItem icon={<Mail size={18} />} text="info@dreamscape.com" />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} Dreamscape. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-800 px-3 py-1">
              Privacy
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-800 px-3 py-1">
              Terms
            </Link>
            <span className="text-gray-300">|</span>
            <Link to="/sitemap" className="text-sm text-gray-500 hover:text-gray-800 px-3 py-1">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-full",
      "text-gray-600 hover:text-black border border-gray-200 hover:border-gray-400",
      "transition-all duration-300"
    )}
  >
    {icon}
  </a>
);

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <Link 
    to={href} 
    className="text-gray-600 hover:text-black transition-colors duration-200"
  >
    {label}
  </Link>
);

const ContactItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-start">
    <div className="text-gray-500 mr-3 mt-1">
      {icon}
    </div>
    <span className="text-gray-600">{text}</span>
  </div>
);

export default Footer;
