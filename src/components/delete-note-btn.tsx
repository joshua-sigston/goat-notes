"use client";

type Props = {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
};

const DeleteNoteBtn = ({ noteId, deleteNoteLocally }: Props) => {
  return <div>DeleteNoteBtn</div>;
};

export default DeleteNoteBtn;
