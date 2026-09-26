import { Link } from 'react-router-dom';
import { Car, Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-charcoal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-accent-600 rounded-lg flex items-center justify-center">
                <Car className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-charcoal-900">Auto</span>
                <span className="text-accent-600">Mate</span>
              </span>
            </Link>
            <p className="text-charcoal-500 text-sm">
              Your trusted partner for premium vehicle rentals. We provide seamless experiences for every journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-charcoal-900 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/" className="hover:text-accent-600 transition-colors">Home</Link></li>
              <li><Link to="/vehicles" className="hover:text-accent-600 transition-colors">Browse Fleet</Link></li>
              <li><Link to="/about" className="hover:text-accent-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-charcoal-900 mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-charcoal-600">
              <li><Link to="/vehicles?category=Car" className="hover:text-accent-600 transition-colors">Car Rental</Link></li>
              <li><Link to="/vehicles?category=SUV" className="hover:text-accent-600 transition-colors">SUV Rental</Link></li>
              <li><Link to="/vehicles?category=Luxury" className="hover:text-accent-600 transition-colors">Luxury Vehicles</Link></li>
              <li><Link to="/corporate" className="hover:text-accent-600 transition-colors">Corporate Accounts</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-charcoal-900 mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-charcoal-50 rounded-lg flex items-center justify-center text-charcoal-600 hover:bg-accent-600 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-charcoal-50 rounded-lg flex items-center justify-center text-charcoal-600 hover:bg-accent-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-charcoal-50 rounded-lg flex items-center justify-center text-charcoal-600 hover:bg-accent-600 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 bg-charcoal-50 rounded-lg flex items-center justify-center text-charcoal-600 hover:bg-accent-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-200 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-charcoal-500">
            &copy; {currentYear} AutoMate. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-charcoal-500">
            <Link to="/privacy" className="hover:text-accent-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
