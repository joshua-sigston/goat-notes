import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("newest note");
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "";
  console.log("fetch newest note", userId);

  const newestNoteId = await prisma.note.findFirst({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });

  return NextResponse.json({
    newestNoteId: newestNoteId?.id,
  });
}
