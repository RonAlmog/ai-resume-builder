import { Metadata } from "next";
import ResumeEditor from "./resume-editor";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

interface PageProps {
  // next15! searchParams are now async, so need to be wrapped by a promise
  searchParams: Promise<{ resumeId?: string }>;
}

// metadata only works with server component.
// thats why the real work is done in a client component called from here
export const metadata: Metadata = {
  title: "Design your resumes",
};
const Editor = async ({ searchParams }: PageProps) => {
  const { resumeId } = await searchParams;

  const { userId } = await auth();
  if (!userId) return null;

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />;
};

export default Editor;
