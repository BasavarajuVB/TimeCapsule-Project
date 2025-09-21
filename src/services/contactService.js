// Contact service for handling contact form submissions
// This service can be extended to integrate with email services, databases, or third-party APIs

export const submitContactForm = async (formData) => {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('All required fields must be filled out');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Validate message length
    if (formData.message.length < 10) {
      throw new Error('Message must be at least 10 characters long');
    }

    // Simulate API call - replace with actual implementation
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure (90% success rate for demo)
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            message: 'Message sent successfully',
            ticketId: `TC-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
          });
        } else {
          reject(new Error('Failed to send message. Please try again.'));
        }
      }, 2000);
    });

    // Log the contact form submission (in a real app, this would be sent to your backend)
    console.log('Contact form submission:', {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ticketId: response.ticketId
    });

    return response;
  } catch (error) {
    console.error('Contact form submission error:', error);
    throw error;
  }
};

export const getContactTypes = () => {
  return [
    { 
      value: "general", 
      label: "General Inquiry", 
      description: "Questions about our service or general information",
      priority: "normal"
    },
    { 
      value: "support", 
      label: "Technical Support", 
      description: "Help with technical issues or account problems",
      priority: "high"
    },
    { 
      value: "bug", 
      label: "Report a Bug", 
      description: "Report issues or unexpected behavior",
      priority: "high"
    },
    { 
      value: "feature", 
      label: "Feature Request", 
      description: "Suggest new features or improvements",
      priority: "normal"
    },
    { 
      value: "feedback", 
      label: "Feedback", 
      description: "Share your thoughts and suggestions",
      priority: "normal"
    },
    { 
      value: "business", 
      label: "Business Inquiry", 
      description: "Partnership, collaboration, or business opportunities",
      priority: "normal"
    }
  ];
};

export const getResponseTimeInfo = (type) => {
  const responseTimes = {
    general: "Within 24 hours",
    support: "Within 12 hours", 
    bug: "Within 6 hours",
    feature: "Within 48 hours",
    feedback: "Within 24 hours",
    business: "Within 48 hours"
  };
  
  return responseTimes[type] || "Within 24 hours";
};
