"use client";

import { useEffect, useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function ShikiCodeBlock({ code, lang = "html", className = "" }) {
  const [html, setHtml] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function highlight() {
      const { codeToHtml } = await import("shiki");
      const result = await codeToHtml(code.trim(), {
        lang,
        theme: "github-dark",
      });
      if (!cancelled) setHtml(result);
    }
    highlight();
    return () => { cancelled = true; };
  }, [code, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative overflow-hidden rounded-[8px] text-[12.5px] leading-relaxed ${className}`}>
      <style>{`
        .shiki-code-scrollable {
          scrollbar-color: #30363d #0d1117;
          scrollbar-width: thin;
        }
        .shiki-code-scrollable::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .shiki-code-scrollable::-webkit-scrollbar-track {
          background: #0d1117;
        }
        .shiki-code-scrollable::-webkit-scrollbar-corner {
          background: #0d1117;
        }
        .shiki-code-scrollable::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .shiki-code-scrollable::-webkit-scrollbar-thumb:hover {
          background: #424a52;
        }
      `}</style>
      {/* Top bar */}
      <div className="flex items-center justify-between bg-[#1f2428] px-4 py-2 border-b border-white/10">
        <span className="text-[11px] font-medium text-white/40 uppercase tracking-widest select-none">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11.5px] font-semibold text-white/50 transition-colors hover:bg-white/10 hover:text-white/90"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" strokeWidth={2.5} />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={2.5} />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code area */}
      {html ? (
        <div
          className="shiki-code-scrollable overflow-x-auto bg-[#0d1117] [&>pre]:m-0! [&>pre]:rounded-none! [&>pre]:rounded-b-[8px]! [&>pre]:p-4 [&>pre]:text-[12.5px]! [&>pre]:leading-relaxed [&>pre]:bg-[#0d1117]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="shiki-code-scrollable overflow-x-auto bg-[#0d1117] p-4 text-[12.5px] leading-relaxed text-slate-400">
          {code.trim()}
        </pre>
      )}
    </div>
  );
}
