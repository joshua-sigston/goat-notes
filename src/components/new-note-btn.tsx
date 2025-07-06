"use client";

import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};

const NewNoteBtn = ({ user }: Props) => {
  console.log(user?.email);
  return <div>new-note-btn</div>;
};

export default NewNoteBtn;
