import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Card className="card-cosmic p-12">
            <div className="space-y-8">
              {/* 404 Icon */}
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Clock className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent font-bold text-lg">?</span>
                </div>
              </div>

              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                  404
                </h1>
                <h2 className="text-2xl font-semibold text-foreground">
                  Time Capsule Not Found
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Oops! It looks like this time capsule has been lost in the digital void. 
                  The page you're looking for might have been moved, deleted, or never existed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="cosmic" size="lg" className="w-full sm:w-auto">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for something specific? Try these popular pages:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link 
                    to="/dashboard" 
                    className="text-sm text-primary hover:underline"
                  >
                    Dashboard
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link 
                    to="/about" 
                    className="text-sm text-primary hover:underline"
                  >
                    About
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link 
                    to="/contact" 
                    className="text-sm text-primary hover:underline"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
