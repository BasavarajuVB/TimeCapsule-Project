import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm, getContactTypes, getResponseTimeInfo } from "@/services/contactService";
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  Heart,
  Users,
  HelpCircle,
  Bug,
  Lightbulb,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const { toast } = useToast();

  const contactTypes = getContactTypes();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Reset success state when user starts typing
    if (isSubmitted) {
      setIsSubmitted(false);
      setTicketId(null);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const response = await submitContactForm(formData);
      
      setIsSubmitted(true);
      setTicketId(response.ticketId);
      
      toast({
        title: "Message Sent Successfully!",
        description: `Thank you for contacting us. Your ticket ID is ${response.ticketId}. We'll get back to you within ${getResponseTimeInfo(formData.type)}.`,
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        type: "general"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "support@timecapsules.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Live Chat",
      value: "Available 9 AM - 6 PM EST",
      description: "Get instant help from our team"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Monday to Friday, 9 AM - 5 PM EST"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Office",
      value: "San Francisco, CA",
      description: "Visit us at our headquarters"
    }
  ];

  const faqs = [
    {
      question: "How secure are my time capsules?",
      answer: "Your time capsules are encrypted and stored securely in Firebase. We use industry-standard security practices to protect your data."
    },
    {
      question: "Can I edit a time capsule after creating it?",
      answer: "Currently, time capsules cannot be edited after creation to maintain their authenticity. However, you can create a new one if needed."
    },
    {
      question: "What happens if I forget my password?",
      answer: "You can reset your password using the 'Forgot Password' link on the sign-in page. We'll send you a secure reset link via email."
    },
    {
      question: "Can I share my time capsules with others?",
      answer: "Time capsules are private by default. You can choose to share them after opening, but they remain personal until you decide otherwise."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              <Heart className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're here to help! Whether you have questions, need support, or want to share feedback, 
              we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className={`bg-card/50 border-border/50 ${formErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                        />
                        {formErrors.name && (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            {formErrors.name}
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className={`bg-card/50 border-border/50 ${formErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                        />
                        {formErrors.email && (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            {formErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Inquiry Type</Label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border/50 rounded-md bg-card/50 text-foreground"
                      >
                        {contactTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-sm text-muted-foreground">
                        {contactTypes.find(t => t.value === formData.type)?.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief description of your inquiry"
                        required
                        className={`bg-card/50 border-border/50 ${formErrors.subject ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      {formErrors.subject && (
                        <div className="flex items-center gap-1 text-sm text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          {formErrors.subject}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                        className={`bg-card/50 border-border/50 ${formErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                      />
                      <div className="flex justify-between items-center">
                        {formErrors.message ? (
                          <div className="flex items-center gap-1 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            {formErrors.message}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Minimum 10 characters required
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {formData.message.length}/500
                        </p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      variant="cosmic" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{info.title}</h3>
                          <p className="text-foreground">{info.value}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <Card className="p-6 card-cosmic">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-foreground">Response Time</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• General inquiries: Within 24 hours</p>
                  <p>• Technical support: Within 12 hours</p>
                  <p>• Bug reports: Within 6 hours</p>
                  <p>• Feature requests: Within 48 hours</p>
                  <p>• Feedback: Within 24 hours</p>
                  <p>• Business inquiries: Within 48 hours</p>
                </div>
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-primary">
                    Current selection: {getResponseTimeInfo(formData.type)}
                  </p>
                </div>
              </Card>

              {/* Success Message */}
              {isSubmitted && ticketId && (
                <Card className="p-6 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-800 dark:text-green-200">Message Sent Successfully!</h3>
                  </div>
                  <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
                    <p><strong>Ticket ID:</strong> {ticketId}</p>
                    <p><strong>Expected Response:</strong> {getResponseTimeInfo(formData.type)}</p>
                    <p>We've received your message and will get back to you as soon as possible.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about Time Capsules.
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="card-cosmic p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Heart className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-bold text-foreground">Developed with ❤️</h2>
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-gradient-cosmic rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">BV</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-foreground">BasavarajuVB</h3>
                    <p className="text-muted-foreground">Fullstack Developer at Web3Today</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">
                  This Time Capsule app was built with modern technologies including React, Firebase, and Tailwind CSS.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a 
                    href="https://www.linkedin.com/in/basavaraju-vb/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="https://github.com/BasavarajuVB" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                  <a 
                    href="https://github.com/BasavarajuVB/TimeCapsule-Project.git" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Repository
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Card className="card-cosmic p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-bold text-foreground">Join Our Community</h2>
                <Users className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground">
                Connect with other time capsule creators and share your experiences. 
                Follow us on social media for updates and inspiration.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="outline" className="px-4 py-2">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Twitter
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
                  Discord
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <Heart className="w-4 h-4 mr-2" />
                  Instagram
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
