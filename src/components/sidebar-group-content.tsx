"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[];
};

const SidebarGroupContent = ({ notes }: Props) => {
  // console.log(notes);
  return <>Your notes here</>;
};

export default SidebarGroupContent;
