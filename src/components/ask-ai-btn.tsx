"use client";

import { User } from "@supabase/supabase-js";
import React from "react";

type Props = {
  user: User | null;
};

const AskAIBtn = ({ user }: Props) => {
  console.log(user?.email);
  return <div>AskAIBtn</div>;
};

export default AskAIBtn;
