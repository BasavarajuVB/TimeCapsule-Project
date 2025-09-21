import { Button } from "@/components/ui/button";
import { Plus, Filter, Search, RefreshCw, X, Calendar, Clock, Lock, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import TimeCapsuleCard from "./TimeCapsuleCard";
import CreateCapsuleModal from "./CreateCapsuleModal";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserTimeCapsules, checkAndUnlockCapsules, unlockTimeCapsule } from "@/services/timeCapsuleService";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [timeCapsules, setTimeCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all", // all, locked, unlocked
    sortBy: "newest", // newest, oldest, unlockDate
    timeRange: "all" // all, thisWeek, thisMonth, thisYear
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { currentUser } = useAuth();
  const { toast } = useToast();

  const loadTimeCapsules = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const capsules = await getUserTimeCapsules(currentUser.uid);
      setTimeCapsules(capsules);
      
      // Check for newly unlocked capsules
      const unlockedCapsules = await checkAndUnlockCapsules(currentUser.uid);
      if (unlockedCapsules.length > 0) {
        toast({
          title: "Time Capsules Unlocked!",
          description: `${unlockedCapsules.length} capsule(s) are now ready to open!`,
        });
        // Reload capsules to get updated status
        const updatedCapsules = await getUserTimeCapsules(currentUser.uid);
        setTimeCapsules(updatedCapsules);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to load time capsules.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTimeCapsules();
  }, [currentUser]);

  // Periodic check for unlocking capsules (every 30 seconds)
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(async () => {
      try {
        const unlockedCapsules = await checkAndUnlockCapsules(currentUser.uid);
        if (unlockedCapsules.length > 0) {
          toast({
            title: "Time Capsules Unlocked!",
            description: `${unlockedCapsules.length} capsule(s) are now ready to open!`,
          });
          // Reload capsules to get updated status
          const updatedCapsules = await getUserTimeCapsules(currentUser.uid);
          setTimeCapsules(updatedCapsules);
        }
      } catch (error) {
        console.error('Error checking for unlocked capsules:', error);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [currentUser, toast]);

  // Filter and sort logic
  const getFilteredAndSortedCapsules = () => {
    let filtered = [...timeCapsules];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(capsule =>
        capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        capsule.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status === "locked") {
      filtered = filtered.filter(capsule => !capsule.isUnlocked);
    } else if (filters.status === "unlocked") {
      filtered = filtered.filter(capsule => capsule.isUnlocked);
    }

    // Apply time range filter
    const now = new Date();
    if (filters.timeRange === "thisWeek") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(capsule => capsule.createdAt >= weekAgo);
    } else if (filters.timeRange === "thisMonth") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(capsule => capsule.createdAt >= monthAgo);
    } else if (filters.timeRange === "thisYear") {
      const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(capsule => capsule.createdAt >= yearAgo);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime();
        case "unlockDate":
          return a.unlockDate.getTime() - b.unlockDate.getTime();
        case "newest":
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

    return filtered;
  };

  const filteredCapsules = getFilteredAndSortedCapsules();
  const lockedCapsules = filteredCapsules.filter(capsule => !capsule.isUnlocked);
  const unlockedCapsules = filteredCapsules.filter(capsule => capsule.isUnlocked);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      sortBy: "newest",
      timeRange: "all"
    });
    setSearchTerm("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.sortBy !== "newest") count++;
    if (filters.timeRange !== "all") count++;
    if (searchTerm) count++;
    return count;
  };

  const handleManualUnlock = async () => {
    try {
      const unlockedCapsules = await checkAndUnlockCapsules(currentUser.uid);
      if (unlockedCapsules.length > 0) {
        toast({
          title: "Time Capsules Unlocked!",
          description: `${unlockedCapsules.length} capsule(s) are now ready to open!`,
        });
        // Reload capsules to get updated status
        await loadTimeCapsules();
      } else {
        toast({
          title: "No capsules to unlock",
          description: "All capsules are either already unlocked or not yet ready.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check for unlocked capsules.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Time Capsules</h1>
              <p className="text-muted-foreground">Manage your memories and future surprises</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={handleManualUnlock}>
                <RefreshCw className="w-5 h-5" />
                Check Unlocks
              </Button>
              <Button variant="cosmic" size="lg" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-5 h-5" />
                Create New Capsule
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search your capsules..." 
                className="pl-10 bg-card/50 border-border/50 focus:border-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="default" className="relative">
                    <Filter className="w-4 h-4" />
                    Filter
                    {getActiveFiltersCount() > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Filter & Sort</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Status</label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={filters.status === "all" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFilterChange("status", "all")}
                          className="text-xs"
                        >
                          All
                        </Button>
                        <Button
                          variant={filters.status === "locked" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFilterChange("status", "locked")}
                          className="text-xs"
                        >
                          <Lock className="w-3 h-3 mr-1" />
                          Locked
                        </Button>
                        <Button
                          variant={filters.status === "unlocked" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleFilterChange("status", "unlocked")}
                          className="text-xs"
                        >
                          <Unlock className="w-3 h-3 mr-1" />
                          Unlocked
                        </Button>
                      </div>
                    </div>

                    {/* Sort By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Sort By</label>
                      <div className="space-y-1">
                        {[
                          { value: "newest", label: "Newest First", icon: <Clock className="w-3 h-3" /> },
                          { value: "oldest", label: "Oldest First", icon: <Clock className="w-3 h-3" /> },
                          { value: "unlockDate", label: "Unlock Date", icon: <Calendar className="w-3 h-3" /> }
                        ].map((option) => (
                          <Button
                            key={option.value}
                            variant={filters.sortBy === option.value ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleFilterChange("sortBy", option.value)}
                            className="w-full justify-start text-xs"
                          >
                            {option.icon}
                            <span className="ml-2">{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Time Range */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Created</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: "all", label: "All Time" },
                          { value: "thisWeek", label: "This Week" },
                          { value: "thisMonth", label: "This Month" },
                          { value: "thisYear", label: "This Year" }
                        ].map((option) => (
                          <Button
                            key={option.value}
                            variant={filters.timeRange === option.value ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleFilterChange("timeRange", option.value)}
                            className="text-xs"
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Active Filters Summary */}
        {getActiveFiltersCount() > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: "{searchTerm}"
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Status: {filters.status}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleFilterChange("status", "all")}
                  />
                </Badge>
              )}
              {filters.sortBy !== "newest" && (
                <Badge variant="secondary" className="gap-1">
                  Sort: {filters.sortBy}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleFilterChange("sortBy", "newest")}
                  />
                </Badge>
              )}
              {filters.timeRange !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  Time: {filters.timeRange}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleFilterChange("timeRange", "all")}
                  />
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-cosmic p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {getActiveFiltersCount() > 0 ? filteredCapsules.length : timeCapsules.length}
            </div>
            <div className="text-sm text-muted-foreground">
              {getActiveFiltersCount() > 0 ? "Filtered Results" : "Total Capsules"}
            </div>
          </div>
          <div className="card-treasure p-6 text-center">
            <div className="text-3xl font-bold text-accent mb-2">{lockedCapsules.length}</div>
            <div className="text-sm text-muted-foreground">Locked Capsules</div>
          </div>
          <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-success mb-2">{unlockedCapsules.length}</div>
            <div className="text-sm text-muted-foreground">Ready to Open</div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading your time capsules...</p>
          </div>
        )}

        {/* Ready to Open Section */}
        {!loading && unlockedCapsules.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Ready to Open</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-success/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unlockedCapsules
                .filter(capsule =>
                  capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  capsule.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((capsule) => (
                  <TimeCapsuleCard 
                    key={capsule.id} 
                    capsule={{
                      id: capsule.id,
                      title: capsule.title,
                      description: capsule.description,
                      unlockDate: capsule.unlockDate.toISOString().split('T')[0],
                      isLocked: false,
                      theme: "treasure",
                      contentTypes: ["message"],
                      recipients: 1
                    }} 
                  />
                ))}
            </div>
          </div>
        )}

        {/* Locked Capsules Section */}
        {!loading && lockedCapsules.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Locked Capsules</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedCapsules
                .filter(capsule =>
                  capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  capsule.description.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((capsule) => (
                  <TimeCapsuleCard 
                    key={capsule.id} 
                    capsule={{
                      id: capsule.id,
                      title: capsule.title,
                      description: capsule.description,
                      unlockDate: capsule.unlockDate.toISOString().split('T')[0],
                      isLocked: true,
                      theme: "cosmic",
                      contentTypes: ["message"],
                      recipients: 1
                    }} 
                  />
                ))}
            </div>
          </div>
        )}

        {/* Empty state (hidden when there are capsules) */}
        {!loading && timeCapsules.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No time capsules yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Create your first time capsule to start preserving memories for the future.
            </p>
            <Button variant="cosmic" size="lg" onClick={() => setIsCreateModalOpen(true)}>
              Create Your First Capsule
            </Button>
          </div>
        )}

        {/* No search/filter results */}
        {!loading && timeCapsules.length > 0 && filteredCapsules.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-24 h-24 mx-auto bg-muted/20 rounded-full flex items-center justify-center">
              <Filter className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No capsules found</h3>
            <p className="text-muted-foreground">
              {getActiveFiltersCount() > 0 
                ? "Try adjusting your filters or search terms."
                : "Try adjusting your search terms or create a new capsule."
              }
            </p>
            {getActiveFiltersCount() > 0 && (
              <Button variant="outline" size="lg" onClick={clearFilters}>
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        )}

        <CreateCapsuleModal 
          open={isCreateModalOpen} 
          onOpenChange={setIsCreateModalOpen}
          onCapsuleCreated={loadTimeCapsules}
        />
      </div>
    </div>
  );
};

export default Dashboard;
