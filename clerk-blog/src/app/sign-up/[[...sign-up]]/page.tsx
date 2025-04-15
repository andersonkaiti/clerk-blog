import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center p-10">
      <SignUp
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
