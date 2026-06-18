"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";
import api from "@/lib/axios";
import { toast } from "sonner";


export function AddYoutubeContent({ onBack, onAdd }) {
  const { selectedChatbot } = useChatbot();
  const [youtubeUrlsText, setYoutubeUrlsText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quota, setQuota] = useState(null); // { pagesRemaining, estimatedVideosRemaining }

  useEffect(() => {
    api
      .get("/ingestion/youtube-quota")
      .then((r) => setQuota(r.data?.data ?? null))
      .catch(() => {}); // non-blocking — show "—" on failure
  }, []);

  const handleSubmit = async () => {
    if (!youtubeUrlsText.trim()) {
      toast.error("Please enter at least one YouTube URL");
      return;
    }

    const urls = youtubeUrlsText.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!urls.length) {
      toast.error("No valid YouTube URLs found");
      return;
    }

    const chatbotId = selectedChatbot?.id || selectedChatbot?.chatbotId;
    if (!chatbotId) {
      toast.error("No chatbot selected");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await api.post("/ingestion/youtube", { chatbotId, urls });
      const data = result.data?.data;
      if (data?.parseErrors?.length > 0 && !data?.successful?.length && !data?.deferred?.length) {
        toast.error("No valid YouTube URLs recognised. Check your input.");
      } else {
        toast.success("YouTube content queued — processing in the background.");
        if (onAdd) onAdd();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit YouTube content");
    } finally {
      setIsSubmitting(false);
    }
  };

  const quotaLine =
    quota == null
      ? "Loading quota..."
      : `You have ${quota.pagesRemaining} pages remaining (~${quota.estimatedMinutesRemaining} min of video — rough estimate, actual usage is calculated after processing).`;

  return (
    <div className="relative flex h-full flex-col">
      <div className="mb-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-slate-500 hover:text-slate-800"
          onClick={onBack}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Button>
      </div>
      <div>
        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Add YouTube Content
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              YouTube URLs <span className="text-red-500">*</span>
            </Label>
            <Textarea
              className="min-h-[160px]"
              placeholder="https://www.youtube.com/watch?v=...&#10;https://www.youtube.com/playlist?list=...&#10;https://www.youtube.com/@channel"
              value={youtubeUrlsText}
              onChange={(e) => setYoutubeUrlsText(e.target.value)}
            />
            <div className="mt-2 space-y-1 text-sm text-slate-500">
              <p>Enter one URL per line. Supported formats:</p>
              <p>
                <strong>Videos:</strong> youtube.com/watch?v=... or youtu.be/...
              </p>
              <p>
                <strong>Playlists:</strong> youtube.com/playlist?list=...
              </p>
              <p>
                <strong>Channels:</strong> youtube.com/@username or
                youtube.com/channel/...
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-500">{quotaLine}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 font-medium text-white hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Add YouTube Content"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
