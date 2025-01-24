import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: 
            "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case rounded-md px-4 py-2 text-white",
          formFieldInput: 
            "rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500",
          card: "shadow-none",
          socialButtonsBlockButton: 
            "border border-gray-300 hover:border-gray-400 rounded-md",
        },
      }}
    />
  );
}