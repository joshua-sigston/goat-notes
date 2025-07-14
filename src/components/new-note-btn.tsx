"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/notes";

type Props = {
  user: User | null;
};

const NewNoteBtn = ({ user }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // console.log(user?.email);

  const handleNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setIsLoading(true);

      const uuid = uuidv4();
      await createNoteAction(uuid);

      router.push(`/?noteId=${uuid}`);

      toast.success("New note created");

      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleNewNote}
      variant="secondary"
      className="w-24"
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
};

export default NewNoteBtn;
