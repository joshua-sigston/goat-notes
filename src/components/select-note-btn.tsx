"use client";

import useNote from "@/hooks/use-note";
import { Note } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
};

const SelectNoteBtn = ({ note }: Props) => {
  const [localNoteText, setLocalNoteText] = useState("");
  const [shouldUseGlobalNoteText, setShouldUseGlobalNotetext] = useState(false);
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();
  const blankNoteText = "EMPTY NOTE";

  let noteText = localNoteText || blankNoteText;

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalNotetext(true);
    } else {
      setShouldUseGlobalNotetext(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldUseGlobalNoteText]);

  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText;
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?noteId=${note.id} `} className="flex h-fit flex-col">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
        <p className="text-muted-foreground text-xs">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  );
};

export default SelectNoteBtn;
