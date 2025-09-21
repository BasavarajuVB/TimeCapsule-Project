import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Lock, Unlock, Eye } from "lucide-react";
import { format } from "date-fns";

const TimeCapsuleDetailsModal = ({ 
  open, 
  onOpenChange, 
  capsule, 
  onOpenCapsule 
}) => {
  const unlockDate = new Date(capsule.unlockDate);
  const isUnlocked = !capsule.isLocked;
  const canOpen = isUnlocked && unlockDate <= new Date();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-cosmic bg-clip-text text-transparent flex items-center gap-2">
            {isUnlocked ? (
              <Unlock className="w-6 h-6 text-success" />
            ) : (
              <Lock className="w-6 h-6 text-warning" />
            )}
            {capsule.title}
          </DialogTitle>
          <DialogDescription>
            {isUnlocked 
              ? "This time capsule is ready to be opened!" 
              : "This time capsule is still locked until the unlock date."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <Badge 
              variant={isUnlocked ? "default" : "secondary"}
              className={isUnlocked ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}
            >
              {isUnlocked ? "Unlocked" : "Locked"}
            </Badge>
            {canOpen && (
              <Badge variant="outline" className="border-success text-success">
                Ready to Open
              </Badge>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {capsule.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Unlock Date
              </h3>
              <p className="text-muted-foreground">
                {format(unlockDate, "PPP 'at' p")}
              </p>
              {!isUnlocked && (
                <p className="text-sm text-warning">
                  {unlockDate > new Date() 
                    ? `Will unlock in ${Math.ceil((unlockDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`
                    : "Ready to unlock!"
                  }
                </p>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Content Type
              </h3>
              <div className="flex flex-wrap gap-2">
                {capsule.contentTypes.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Theme Display */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Theme</h3>
            <div className={`p-4 rounded-lg border ${
              capsule.theme === 'cosmic' ? 'card-cosmic' :
              capsule.theme === 'treasure' ? 'card-treasure' :
              capsule.theme === 'mystic' ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20' :
              'bg-gradient-to-br from-success/10 to-success/5 border-success/20'
            }`}>
              <p className="font-medium capitalize">{capsule.theme} Theme</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {canOpen ? (
              <Button 
                onClick={onOpenCapsule}
                className="flex-1 bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70"
              >
                <Unlock className="w-4 h-4 mr-2" />
                Open Time Capsule
              </Button>
            ) : (
              <Button 
                disabled 
                variant="outline" 
                className="flex-1"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isUnlocked ? "Not Ready Yet" : "Still Locked"}
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>

          {/* Unlock Message */}
          {!isUnlocked && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="w-5 h-5" />
                <p className="text-sm">
                  This time capsule will automatically unlock on{" "}
                  <span className="font-medium text-foreground">
                    {format(unlockDate, "PPP")}
                  </span>
                  . You'll be able to open it then!
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimeCapsuleDetailsModal;
