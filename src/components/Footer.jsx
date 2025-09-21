import { Heart, Clock, Github, Twitter, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-cosmic rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                TimeCapsule
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Preserve your memories and connect with your future self through 
              the magic of digital time capsules.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="space-y-2">
              <Link 
                to="/about" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link 
                to="/dashboard" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/auth" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
            </nav>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Features</h3>
            <nav className="space-y-2">
              <span className="block text-sm text-muted-foreground">
                Time-Locked Storage
              </span>
              <span className="block text-sm text-muted-foreground">
                Memory Sharing
              </span>
              <span className="block text-sm text-muted-foreground">
                AI Predictions
              </span>
              <span className="block text-sm text-muted-foreground">
                Secure Encryption
              </span>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-9 h-9 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Join our community and share your time capsule journey.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Digital Time Capsule. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-500" /> for preserving memories.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
