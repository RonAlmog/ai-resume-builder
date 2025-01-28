"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export async function deleteSummary(id: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const resume = await prisma.resume.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!resume) {
    throw new Error("Resume not found");
  }
  // if resume has photo, delete it
  if (resume.photoUrl) {
    await del(resume.photoUrl);
  }
  // only then delete the resume
  await prisma.resume.delete({
    where: { id },
  });

  // break the cache so the page refreshes and reflects the changes
  revalidatePath("/resumes");
}
