"use client";
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </main>
  );
};

export default SignUpPage;
