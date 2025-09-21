import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Heart, 
  Users, 
  Shield, 
  Sparkles, 
  Globe,
  Star,
  ArrowRight,
  Calendar,
  MessageSquare,
  Lock
} from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Time-Based Unlocking",
      description: "Your memories are safely locked until the date you choose. No peeking until it's time!"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Your time capsules are encrypted and stored securely in Firebase. Your privacy is our priority."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Emotional Journey",
      description: "Experience the joy of rediscovering your past self and the memories you've preserved."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Personal & Private",
      description: "Each time capsule is personal to you. Share only what you want, when you want."
    }
  ];

  const team = [
    {
      name: "The Time Capsule Team",
      role: "Developers & Designers",
      description: "Passionate about preserving memories and creating meaningful digital experiences."
    }
  ];

  const stats = [
    { label: "Time Capsules Created", value: "10,000+", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Memories Preserved", value: "50,000+", icon: <Heart className="w-5 h-5" /> },
    { label: "Happy Users", value: "5,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Years of Memories", value: "25+", icon: <Calendar className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-8 h-8 text-primary" />
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              About Time Capsules
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We believe that memories are the most precious treasures we possess. 
              Our platform helps you preserve your thoughts, dreams, and experiences 
              for future you to discover.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create a digital sanctuary where your most precious memories can be safely preserved 
                and rediscovered at the perfect moment. We understand that some thoughts and experiences 
                are meant to be revisited years later, when you can truly appreciate their significance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's a letter to your future self, memories from a special day, or predictions 
                about your life, we provide the tools to capture these moments and ensure they're waiting 
                for you when the time is right.
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="cosmic" className="text-sm">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Platform
                </Badge>
                <Badge variant="outline" className="text-sm">
                  <Shield className="w-3 h-3 mr-1" />
                  Privacy First
                </Badge>
              </div>
            </div>
            <div className="relative">
              <Card className="card-cosmic p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Preserve</h3>
                      <p className="text-sm text-muted-foreground">Capture your memories</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-6" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure</h3>
                      <p className="text-sm text-muted-foreground">Keep them safe</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-6" />
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Rediscover</h3>
                      <p className="text-sm text-muted-foreground">Unlock when ready</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Why Choose Time Capsules?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built our platform with your privacy, security, and emotional journey in mind.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Our Impact</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users who have already started their time capsule journey.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center card-cosmic">
                <div className="flex items-center justify-center mb-3 text-primary">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              The passionate people behind your time capsule experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-cosmic rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="card-cosmic p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Star className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-bold text-foreground">Start Your Journey</h2>
                <Star className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground">
                Ready to preserve your memories and create your first time capsule? 
                Join our community and start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/auth" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                >
                  Create Your First Capsule
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors duration-300"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
