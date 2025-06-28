"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";

const LogoutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true);

    const { errorMessage } = await logOutAction();

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
      {isLoading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};

export default LogoutBtn;
