import { Metadata } from "next";
import ResumeEditor from "./resume-editor";

// metadata only works with server component.
// thats why the real work is done in a client component called from here
export const metadata: Metadata = {
  title: "Design your resumes",
};
const Editor = () => {
  return <ResumeEditor />;
};

export default Editor;
