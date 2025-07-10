import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import SignInOAuthButton from "./SignInOAuthButton";
import { Link } from "react-router-dom";
import { Button } from "./button";
const Topbar = () => {
  // Set this to true if you want to show the admin dashboard link for admins
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900 backdrop-blur-md z-10">
      <div className="font-bold text-lg">Spotify</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className="flex items-center">
            <LayoutDashboardIcon className="size-4 mr-2" />
            <span>Admin Dashboard</span>
          </Link>
        )}

        {/* Show Sign Out button when signed in */}
        <SignedIn>
          <SignOutButton>
            <Button className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700 transition">
              Sign Out
            </Button>
          </SignOutButton>
        </SignedIn>

        {/* Show Sign In button when signed out */}
        <SignedOut>
          <SignInOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
