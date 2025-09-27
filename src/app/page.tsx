import Link from "next/link";
import { ModeToggle } from "@/components/themes/mode-toggle";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">IACO</h1>
        <ModeToggle />
      </div>

      <p className="text-muted-foreground">Welcome to the AI Crypto Assistant.</p>

      <div className="flex gap-3">
        <Link className="underline" href="/sign-in">Sign in</Link>
        <span className="text-muted-foreground">or</span>
        <Link className="underline" href="/sign-up">Sign up</Link>
      </div>
    </div>
  );
}
