import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-6">
          <Card className="card-cosmic p-8">
            <div className="text-center space-y-2 mb-6">
              <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary glow-cosmic" />
                <Sparkles className="w-4 h-4 text-accent absolute mt-[-20px] ml-6 animate-pulse" />
              </div>
            </div>

            {isSignUp ? (
              <SignUpForm onToggleMode={toggleMode} />
            ) : (
              <SignInForm onToggleMode={toggleMode} />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
