"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getOtherTools } from "../_config/tools.config";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OtherTools({ currentSlug }) {
  const scrollRef = useRef(null);
  const tools = getOtherTools(currentSlug, 12);

  const getViewport = () =>
    scrollRef.current?.querySelector("[data-slot='scroll-area-viewport']");

  const scroll = (dir) => {
    const viewport = getViewport();
    if (!viewport) return;
    viewport.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const viewport = getViewport();
      if (!viewport) return;
      const atEnd =
        viewport.scrollLeft + viewport.clientWidth >=
        viewport.scrollWidth - 1;
      if (atEnd) {
        viewport.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        viewport.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f0f4ff] pb-20 pt-4">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-blue-600">
          Other Tools
        </p>
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Try our other free tools!
        </h2>

        {/* Scrollable row */}
        <div className="relative">
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>

          <ScrollArea
            ref={scrollRef}
            orientation="horizontal"
            type="always"
            className="pb-2"
          >
          <div className="flex gap-4">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="flex w-56 flex-none flex-col overflow-hidden rounded-xl border border-gray-200 bg-linear-to-b from-blue-100 to-white py-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative mx-4 mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-blue-400 bg-white p-1.5">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="h-full w-full rounded-lg object-contain"
                  />
                </div>

                {/* Title */}
                <div className="flex flex-1 flex-col rounded-b-xl bg-white p-4">
                <h3 className="mb-1 text-sm font-semibold leading-snug text-gray-900">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="mb-4 flex-1 text-xs leading-relaxed text-gray-500 line-clamp-3">
                  {tool.description}
                </p>

                <Link
                  href={`/tools/${tool.slug}`}
                  className="inline-flex w-fit items-center rounded-md border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  Try tool
                </Link>
                </div>
              </div>
            ))}
          </div>
          </ScrollArea>

          <button
            onClick={() => scroll(1)}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-sm hover:bg-gray-50"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
