"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EditableSchedule from "@/components/EditableSchedule";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";

export default function EditPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      toast({ title: "Logged in successfully" });
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50/80 via-background to-orange-100/50 dark:from-zinc-950 dark:to-zinc-900 mandala-bg p-4">
        <Card className="w-full max-w-md border border-primary/20 shadow-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-[2rem] overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-amber-500 to-primary" />
          <CardHeader className="space-y-2 pt-8 pb-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <span className="text-primary font-bold text-xl">ॐ</span>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-amber-700 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              Enter your credentials to access the schedule editor
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-primary/20 focus-visible:ring-primary rounded-xl"
                  placeholder="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-primary/20 focus-visible:ring-primary rounded-xl"
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:translate-y-[-1px] active:translate-y-[1px]"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/40 via-background to-orange-100/20 dark:from-zinc-950 dark:to-zinc-900 p-4 md:p-8 mandala-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-4 rounded-[1.5rem] border border-primary/10 shadow-md">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-amber-700 bg-clip-text text-transparent">
              Schedule Editor
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Manage sessions, page text, and resources for Rahuri Center
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="flex items-center space-x-2 text-primary hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-xl px-4 py-2 border border-primary/20"
          >
            <LogOut className="h-4 w-4" />
            <span className="font-semibold text-sm">Sign Out</span>
          </Button>
        </div>
        <EditableSchedule />
      </div>
    </div>
  );
}
