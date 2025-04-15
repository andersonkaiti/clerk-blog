import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-10">
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#0a0a0a",
          },
        }}
      />
    </div>
  );
}
