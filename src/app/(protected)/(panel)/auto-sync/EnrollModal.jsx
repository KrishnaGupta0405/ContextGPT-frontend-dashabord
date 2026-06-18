"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Globe, Search, CalendarClock } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useChatbot } from "@/context/ChatbotContext";
import { useAuth } from "@/context/AuthContext";
import { usePlanUpgradeNotification } from "@/components/PlanUpgradeNotification";

const YtIcon = () => (
  <svg className="h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
  </svg>
);

const SOURCE_ICON = {
  YOUTUBE: <YtIcon />,
};

const SOURCE_LABEL = {
  FIRECRAWL_BULK: "MultipleLink",
  FIRECRAWL_SITEMAP: "Sitemap",
  FIRECRAWL_CRAWL: "Website",
  YOUTUBE: "YouTube",
};

export function EnrollModal({ isOpen, onClose, onEnrolled }) {
  const { selectedChatbot } = useChatbot();
  const { subscription } = useAuth();
  const { showNotification } = usePlanUpgradeNotification();
  const autoRefreshOccurrence = subscription?.autoRefreshDataOccurrence ?? "monthly";
  const autoRefreshSupported = subscription?.autoRefreshData ?? false;
  const isStarterPlanUser = /^pri_starter_/i.test(subscription?.planType ?? "");

  const [eligible, setEligible] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [frequency, setFrequency] = useState(autoRefreshOccurrence);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelected([]);
      setFrequency(autoRefreshOccurrence);
      setSearch("");
      return;
    }
    fetchEligible();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedChatbot, autoRefreshOccurrence]);

  const fetchEligible = async () => {
    const chatbotId = selectedChatbot?.id || selectedChatbot?.chatbotId;
    if (!chatbotId) return;
    if (isStarterPlanUser || !autoRefreshSupported) return;
    try {
      setLoading(true);
      const res = await api.get(`/ingestion/auto-refresh/eligible`, {
        params: { chatbotId },
      });
      if (res.data?.success) {
        setEligible(res.data.data?.sources || []);
      }
    } catch {
      toast.error("Failed to load eligible sources");
    } finally {
      setLoading(false);
    }
  };

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleEnroll = async () => {
    if (isStarterPlanUser || !autoRefreshSupported) {
      showNotification("autoRefreshData");
      return;
    }
    if (selected.length === 0) {
      toast.error("Select at least one source");
      return;
    }
    const chatbotId = selectedChatbot?.id || selectedChatbot?.chatbotId;
    try {
      setSubmitting(true);
      const res = await api.post(`/ingestion/auto-refresh`, {
        chatbotId,
        ingestionFileIds: selected,
        frequency,
      });
      if (res.data?.success) {
        toast.success(res.data.message || "Enrolled successfully");
        onEnrolled?.();
        onClose(false);
      } else {
        toast.error(res.data?.message || "Enrollment failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    } finally {
      setSubmitting(false);
    }
  };

  const unenrolled = eligible.filter((e) => !e.autoRefresh);
  const filtered = unenrolled.filter((e) =>
    (e.sourceUrl || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-800">
            <CalendarClock className="h-5 w-5 text-blue-600" />
            Enroll Sources for Auto-Refresh
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Frequency picker */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Refresh Frequency
            </p>
            <RadioGroup
              value={frequency}
              onValueChange={setFrequency}
              className="flex gap-4"
            >
              {autoRefreshOccurrence === "monthly" ? (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer text-sm font-medium text-slate-700">
                    Monthly
                  </Label>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer text-sm font-medium text-slate-700">
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer text-sm font-medium text-slate-700">
                      Monthly
                    </Label>
                  </div>
                </>
              )}
            </RadioGroup>
          </div>

          <Separator />

          {/* Source list */}
          <div>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search sources..."
                className="pl-8 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <ScrollArea className="h-64 rounded-md border border-slate-200">
              {loading ? (
                <div className="space-y-2 p-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-md" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center text-sm text-slate-400">
                  <Globe className="mb-2 h-8 w-8 text-slate-300" />
                  {unenrolled.length === 0
                    ? "All eligible sources are already enrolled"
                    : "No sources match your search"}
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filtered.map((src) => (
                    <label
                      key={src.fileId}
                      className="flex cursor-pointer items-start gap-3 px-3 py-2.5 hover:bg-slate-50"
                    >
                      <Checkbox
                        className="mt-0.5"
                        checked={selected.includes(src.fileId)}
                        onCheckedChange={() => toggle(src.fileId)}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          {SOURCE_ICON[src.fileSource] ?? (
                            <Globe className="h-4 w-4 text-blue-500" />
                          )}
                          <span className="truncate text-[13px] font-medium text-slate-700">
                            {src.sourceUrl}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className="mt-0.5 border-slate-200 text-[10px] text-slate-500"
                        >
                          {SOURCE_LABEL[src.fileSource] ?? src.fileSource}
                        </Badge>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </ScrollArea>

            {selected.length > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                {selected.length} source{selected.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onClose(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleEnroll}
            disabled={submitting || selected.length === 0}
          >
            {submitting ? "Enrolling..." : `Enroll ${selected.length > 0 ? `(${selected.length})` : ""}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
