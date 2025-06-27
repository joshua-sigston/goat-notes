"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogOut = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const errorMessage = null;

    if (!errorMessage) {
      toast.success("You have successfully logged out");
      router.push("/");
    } else {
      toast.warning("You were not logged out");
    }

    setIsLoading(false);
  };
  return (
    <Button
      className="w-24"
      variant="outline"
      onClick={handleLogOut}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 /> : "Log Out"}
    </Button>
  );
};

export default LogoutBtn;
