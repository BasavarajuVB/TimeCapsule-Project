import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Gift, 
  Heart, 
  MessageSquare,
  X,
  Share2
} from "lucide-react";
import { format } from "date-fns";

const OpenCapsuleModal = ({ open, onOpenChange, capsule }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const unlockDate = new Date(capsule.unlockDate);
  const createdDate = new Date(); // In real app, this would come from the capsule data

  const handleOpenCapsule = async () => {
    setIsOpening(true);
    
    // Simulate opening animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsOpened(true);
    setShowContent(true);
    setIsOpening(false);
  };

  const handleClose = () => {
    setIsOpened(false);
    setShowContent(false);
    onOpenChange(false);
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setIsOpened(false);
      setShowContent(false);
      setIsOpening(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-cosmic bg-clip-text text-transparent flex items-center gap-2">
            <Gift className="w-6 h-6 text-accent" />
            Opening Your Time Capsule
          </DialogTitle>
          <DialogDescription>
            {isOpened 
              ? "Your time capsule has been opened! Here's what you preserved for yourself."
              : "Get ready to rediscover your past self..."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isOpened ? (
            /* Opening Animation */
            <div className="text-center py-12 space-y-6">
              <div className="relative">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center ${
                  capsule.theme === 'cosmic' ? 'card-cosmic' :
                  capsule.theme === 'treasure' ? 'card-treasure' :
                  'bg-gradient-to-br from-success/10 to-success/5 border border-success/20'
                }`}>
                  {isOpening ? (
                    <div className="animate-spin">
                      <Sparkles className="w-12 h-12 text-primary" />
                    </div>
                  ) : (
                    <Gift className="w-12 h-12 text-primary" />
                  )}
                </div>
                
                {isOpening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {isOpening ? "Opening Your Time Capsule..." : "Ready to Open?"}
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {isOpening 
                    ? "Unlocking the memories you preserved for this moment..."
                    : "This capsule was created to be opened today. Are you ready to see what your past self left for you?"
                  }
                </p>
              </div>

              {!isOpening && (
                <Button 
                  onClick={handleOpenCapsule}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Open Time Capsule
                </Button>
              )}
            </div>
          ) : (
            /* Opened Content */
            <div className="space-y-6">
              {/* Success Message */}
              <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-success" />
                  <h3 className="text-lg font-semibold text-success">Time Capsule Opened!</h3>
                </div>
                <p className="text-muted-foreground">
                  You've successfully opened your time capsule. Here's what you preserved for yourself.
                </p>
              </div>

              {/* Capsule Content */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Your Message</h3>
                </div>
                
                <div className={`p-6 rounded-lg border ${
                  capsule.theme === 'cosmic' ? 'card-cosmic' :
                  capsule.theme === 'treasure' ? 'card-treasure' :
                  'bg-gradient-to-br from-success/10 to-success/5 border-success/20'
                }`}>
                  <h4 className="text-xl font-bold mb-3">{capsule.title}</h4>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {capsule.description}
                  </p>
                </div>
              </div>

              {/* Time Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Created On
                  </h4>
                  <p className="text-muted-foreground">
                    {format(createdDate, "PPP 'at' p")}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Opened On
                  </h4>
                  <p className="text-muted-foreground">
                    {format(new Date(), "PPP 'at' p")}
                  </p>
                </div>
              </div>

              {/* Content Types */}
              <div className="space-y-2">
                <h4 className="font-semibold">Content Types</h4>
                <div className="flex flex-wrap gap-2">
                  {capsule.contentTypes.map((type, index) => (
                    <Badge key={index} variant="outline">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={handleClose}
                  className="flex-1"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Close & Remember
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    // In a real app, this would share the capsule
                    navigator.clipboard.writeText(`Check out my time capsule: ${capsule.title}`);
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpenCapsuleModal;
