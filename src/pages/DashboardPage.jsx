import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to auth if user is not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/auth");
    }
  }, [currentUser, loading, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render dashboard if user is not authenticated
  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
