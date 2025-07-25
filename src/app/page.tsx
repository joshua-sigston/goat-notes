import { getUser } from "@/auth/server";
import AskAIBtn from "@/components/ask-ai-btn";
import NewNoteBtn from "@/components/new-note-btn";
import NoteTextInput from "@/components/note-text-input";
import { prisma } from "@/db/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const HomePage = async ({ searchParams }: Props) => {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();
  console.log("home page", noteIdParam);

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIBtn user={user} />
        <NewNoteBtn user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
};

export default HomePage;
