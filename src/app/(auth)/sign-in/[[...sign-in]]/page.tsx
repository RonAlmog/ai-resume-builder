import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-3">
      <SignIn />
    </main>
  );
};

export default SignInPage;