"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditableSchedule from "@/components/EditableSchedule";
import { useToast } from "@/hooks/use-toast";
import { LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        toast({ title: "Signed in" });
      } else {
        toast({ title: "Those credentials weren't recognised", variant: "destructive" });
      }
    } catch {
      toast({ title: "Couldn't reach the server", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  /* ---------------- Sign in ---------------- */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 relative overflow-hidden">
        {/* The same slow brass halo as the public pages */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none breath"
          style={{
            width: 620,
            height: 620,
            maxWidth: "120vw",
            background:
              "radial-gradient(circle, hsl(var(--brass) / 0.14) 0%, transparent 62%)",
          }}
        />

        <div className="relative w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the site
          </Link>

          <div className="leaf p-8 md:p-10">
            <div className="text-center">
              <span
                className="marathi block text-[26px] leading-none text-primary flicker"
                aria-hidden
              >
                ॐ
              </span>

              <div className="eyebrow mt-6 mb-5">Administration</div>

              <h1 className="text-[27px] font-medium text-primary leading-tight">
                Sign in
              </h1>
              <p className="marathi text-[16px] text-primary/75 mt-1">
                प्रवेश करा
              </p>

              <div className="diya my-7 max-w-[180px] mx-auto">
                <span className="diya-mark" aria-hidden />
              </div>

              <p className="italic text-[13.5px] text-muted-foreground leading-relaxed">
                For the centre&rsquo;s editors, to manage sessions,
                announcements and page text.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 mt-8">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))]"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--brass-deep))]"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                />
              </div>

              <button type="submit" disabled={busy} className="btn-brass w-full mt-2">
                <span>{busy ? "Signing in…" : "Sign in"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- Editor ---------------- */
  return (
    <div className="min-h-screen">
      {/* A dark brass bar, so the editor reads as a different room to the
          public site — you always know you are behind the curtain. */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "linear-gradient(180deg, hsl(10 40% 16%), hsl(26 32% 11%))",
          borderBottom: "1px solid hsl(37 46% 50% / 0.35)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className="hidden sm:grid place-items-center shrink-0 rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid rgba(226,187,110,0.5)",
                }}
                aria-hidden
              >
                <span className="marathi text-[14px] leading-none" style={{ color: "#e2bb6e" }}>
                  ॐ
                </span>
              </span>
              <div className="min-w-0">
                <p
                  className="text-[11px] uppercase tracking-[0.2em] italic"
                  style={{ color: "#e2bb6e" }}
                >
                  Administration
                </p>
                <h1
                  className="text-[19px] md:text-[21px] font-medium leading-tight truncate"
                  style={{ color: "rgba(242,226,186,0.95)" }}
                >
                  Schedule &amp; content editor
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Link
                href="/"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-[12.5px] rounded-sm transition-colors"
                style={{
                  border: "1px solid rgba(226,187,110,0.35)",
                  color: "rgba(242,226,186,0.8)",
                }}
              >
                View site
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-[12.5px] rounded-sm transition-colors hover:bg-white/10"
                style={{
                  border: "1px solid rgba(226,187,110,0.35)",
                  color: "rgba(242,226,186,0.8)",
                }}
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14">
        <EditableSchedule />
      </main>
    </div>
  );
}
