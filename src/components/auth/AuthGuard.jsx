"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { Highlighter } from "@/components/ui/highlighter";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [minDisplayTimeElapsed, setMinDisplayTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDisplayTimeElapsed(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  if (loading || !user || !minDisplayTimeElapsed) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white">
        <Spinner className="size-10 text-blue-600" />
        <p className="text-[17px] font-semibold text-slate-800">
          Almost there —{" "}
          <Highlighter action="highlight" color="#bfdbfe" animationDuration={800}>
            setting things up
          </Highlighter>{" "}
          for you! ✨
        </p>
        <p className="text-[13.5px] text-slate-500">
          Verifying your{" "}
          <Highlighter action="underline" color="#3b82f6" strokeWidth={2} animationDuration={600}>
            session
          </Highlighter>
          , hang on a sec...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
