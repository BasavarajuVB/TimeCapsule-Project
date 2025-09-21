import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, Sparkles, ArrowRight, Calendar, Lock, Upload, Bell, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroCapsule from "@/assets/hero-cosmic-capsule.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCreateCapsule = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 bg-cosmic-stars opacity-30"></div>
      
      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">Preserve Your Memories</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="block text-foreground">Lock Away</span>
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent glow-cosmic">
                  Today's Magic
                </span>
                <span className="block text-foreground">For Tomorrow</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Create digital time capsules filled with photos, messages, and memories. 
                Set a future date and rediscover your past self when the time is right.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="cosmic" 
                size="lg" 
                className="text-lg"
                onClick={handleCreateCapsule}
              >
                {currentUser ? "Go to Dashboard" : "Start Your Journey"}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost-cosmic" size="lg" className="text-lg">
                    <Clock className="w-5 h-5" />
                    How It Works
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      How Time Capsules Work
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 mt-6">
                    <div className="grid gap-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">1. Create Your Capsule</h3>
                          <p className="text-muted-foreground">
                            Add photos, write messages, record voice notes, or upload any digital memories you want to preserve. 
                            Give your capsule a meaningful title and description to remember what's inside.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">2. Set Your Future Date</h3>
                          <p className="text-muted-foreground">
                            Choose when you want to rediscover your memories. It could be next year, in 5 years, or even decades from now. 
                            Pick a date that's meaningful to you - an anniversary, birthday, or just a random future moment.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Lock className="w-6 h-6 text-success" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">3. Lock It Away</h3>
                          <p className="text-muted-foreground">
                            Once created, your time capsule is securely locked and cannot be opened until the date you specified. 
                            This preserves the magic of rediscovery and prevents you from peeking early!
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bell className="w-6 h-6 text-warning" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">4. Get Notified</h3>
                          <p className="text-muted-foreground">
                            When your chosen date arrives, you'll receive a notification that your time capsule is ready to open. 
                            The anticipation builds as you wait for that special moment!
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-treasure/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Gift className="w-6 h-6 text-treasure" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">5. Rediscover & Relive</h3>
                          <p className="text-muted-foreground">
                            Open your capsule and journey back in time. See how much you've grown, remember forgotten moments, 
                            and experience the joy of reconnecting with your past self. It's like receiving a gift from yourself!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-6 border border-border/50">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Why Time Capsules?
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        In our fast-paced world, moments slip by unnoticed. Time capsules help you pause, reflect, 
                        and create intentional memories. They're perfect for capturing feelings during major life events, 
                        preserving family memories, setting future goals, or simply creating a surprise for your future self.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium">Set Future Date</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm font-medium">Secure & Locked</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-success/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-success" />
                </div>
                <p className="text-sm font-medium">Magical Reveal</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden card-cosmic p-1">
              <img 
                src={heroCapsule} 
                alt="Mystical time capsule floating in cosmic space" 
                className="w-full h-auto rounded-xl"
              />
              {/* Floating elements overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4 text-white">
                  <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Clock className="w-8 h-8 glow-treasure" />
                  </div>
                  <p className="text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    Your memories, perfectly preserved
                  </p>
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
