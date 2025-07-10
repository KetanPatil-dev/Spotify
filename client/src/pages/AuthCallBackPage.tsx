import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallBackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return;
      try {
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
        syncAttempted.current = true;
      } catch (error) {
        console.log("SyncUser Error", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc">
        <CardContent className="flex flex-col items-center gap-5  ">
          <Loader className="size-9 animate-spin text-pink-700" />
          <h3 className="text-zinc-400 text-center font-bold">
            Logging you In
          </h3>
          <h5 className="text-zinc-400 text-center text-sm">Redirecting...</h5>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallBackPage;
