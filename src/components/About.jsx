import { Button } from "@/components/ui/button";
import { Clock, Shield, Heart, Share, Sparkles, Users } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Clock,
      title: "Time-Locked Memories",
      description: "Preserve your precious moments and open them at the perfect future date."
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Your memories are encrypted and safely stored until their unlock date."
    },
    {
      icon: Heart,
      title: "Emotional Journey",
      description: "Rediscover your past thoughts and feelings with a meaningful experience."
    },
    {
      icon: Share,
      title: "Share with Loved Ones",
      description: "Include friends and family as recipients of your future memories."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Get thoughtful prompts to help you create meaningful capsule content."
    },
    {
      icon: Users,
      title: "Memory Milestones",
      description: "Mark special life events and anniversaries within your capsules."
    }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            About Digital Time Capsules
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Create a bridge between your present and future self. Preserve memories, 
            thoughts, and predictions that will unlock at the perfect moment in time.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group card-cosmic p-8 text-center hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-cosmic rounded-full flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-card/50 rounded-2xl p-8 md:p-12 border border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Your Story Across Time
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every moment in your life is unique and fleeting. Digital Time Capsules 
                helps you capture not just what happened, but how you felt, what you 
                hoped for, and what you believed about the future.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether it's a letter to your future self, photos from a special day, 
                or predictions about where you'll be in five years, each capsule becomes 
                a precious time machine that connects who you are today with who you'll become.
              </p>
              <Button variant="cosmic" size="lg">
                Start Your Journey
              </Button>
            </div>
            
            <div className="relative">
              <div className="card-treasure p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="h-4 bg-gradient-treasure rounded opacity-80"></div>
                  <div className="h-4 bg-gradient-cosmic rounded opacity-60"></div>
                  <div className="h-4 bg-gradient-treasure rounded opacity-40"></div>
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Unlock Date</span>
                      <Clock className="w-4 h-4 text-accent" />
                    </div>
                    <div className="h-2 bg-gradient-cosmic rounded opacity-80"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-cosmic rounded-full shadow-glow animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-treasure rounded-full shadow-glow animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
