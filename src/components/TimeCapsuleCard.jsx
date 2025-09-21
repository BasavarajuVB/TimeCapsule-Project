import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, Lock, Unlock, Image, MessageCircle, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import TimeCapsuleDetailsModal from "./TimeCapsuleDetailsModal";
import OpenCapsuleModal from "./OpenCapsuleModal";

const TimeCapsuleCard = ({ capsule }) => {
  const { title, description, unlockDate, isLocked, theme, contentTypes, recipients } = capsule;
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  
  const themeClasses = {
    cosmic: "card-cosmic",
    treasure: "card-treasure", 
    mystic: "bg-gradient-to-br from-primary/10 to-secondary/5 border border-primary/20"
  };

  const getTimeUntilUnlock = () => {
    const now = new Date();
    const unlock = new Date(unlockDate);
    const diff = unlock.getTime() - now.getTime();
    
    if (diff <= 0) return "Ready to open!";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} remaining`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} remaining`;
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  };

  return (
    <Card className={cn("p-6 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300", themeClasses[theme])}>
      {/* Status indicator */}
      <div className="absolute top-4 right-4">
        {isLocked ? (
          <div className="bg-accent/20 p-2 rounded-full">
            <Lock className="w-4 h-4 text-accent" />
          </div>
        ) : (
          <div className="bg-success/20 p-2 rounded-full glow-treasure">
            <Unlock className="w-4 h-4 text-success" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-foreground line-clamp-1">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>

        {/* Unlock date and countdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Unlocks: {new Date(unlockDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className={cn(
              "font-medium",
              isLocked ? "text-accent" : "text-success"
            )}>
              {getTimeUntilUnlock()}
            </span>
          </div>
        </div>

        {/* Content types */}
        <div className="flex items-center gap-3">
          {contentTypes.includes('photo') && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Image className="w-3 h-3" />
              <span>Photos</span>
            </div>
          )}
          {contentTypes.includes('message') && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="w-3 h-3" />
              <span>Messages</span>
            </div>
          )}
          {recipients && recipients > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{recipients} recipient{recipients > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="ghost-cosmic" 
            size="sm" 
            className="flex-1"
            onClick={() => setShowDetailsModal(true)}
          >
            <Eye className="w-4 h-4" />
            View Details
          </Button>
          
          {!isLocked && (
            <Button 
              variant="treasure" 
              size="sm" 
              className="flex-1"
              onClick={() => setShowOpenModal(true)}
            >
              <Unlock className="w-4 h-4" />
              Open
            </Button>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg"></div>
      </div>

      {/* Modals */}
      <TimeCapsuleDetailsModal
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        capsule={capsule}
        onOpenCapsule={() => {
          setShowDetailsModal(false);
          setShowOpenModal(true);
        }}
      />

      <OpenCapsuleModal
        open={showOpenModal}
        onOpenChange={setShowOpenModal}
        capsule={capsule}
      />
    </Card>
  );
};

export default TimeCapsuleCard;
