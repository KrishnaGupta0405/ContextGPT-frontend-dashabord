"use client";
import React, { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Globe, AlertCircle } from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";

export function DiscoveredUrlsModal({ isOpen, onClose, record, onIngestComplete }) {
  const [selectedUrls, setSelectedUrls] = useState([]);
  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!record) {
    return null;
  }

  const discoveredUrls = record.discoveredUrls || [];
  const ingestedUrls = new Set(record.ingestedUrls || []);
  const newUrls = discoveredUrls.filter((url) => !ingestedUrls.has(url));

  const filtered = newUrls.filter((url) =>
    url.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (url) => {
    setSelectedUrls((prev) =>
      prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
    );
  };

  const handleIngest = async () => {
    if (selectedUrls.length === 0) {
      toast.error("Select at least one URL to ingest");
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.post(`/ingestion/auto-scan/${record.id}/ingest-urls`, {
        urls: selectedUrls,
      });
      if (res.data?.success) {
        toast.success(`Ingesting ${selectedUrls.length} URL(s) — running in background`);
        onIngestComplete?.();
      } else {
        toast.error(res.data?.message || "Failed to ingest URLs");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to ingest URLs");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-slate-800">
            Discovered URLs — {newUrls.length} new
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {newUrls.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-100 bg-slate-50 py-12 text-center">
              <AlertCircle className="h-10 w-10 text-slate-300" />
              <p className="text-sm text-slate-500">No new URLs discovered</p>
              <p className="text-xs text-slate-400">All URLs in the sitemap have been ingested</p>
            </div>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search URLs..."
                  className="pl-8 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between px-1">
                  <p className="text-xs font-medium text-slate-600">
                    {filtered.length} URL{filtered.length !== 1 ? "s" : ""}
                  </p>
                  {selectedUrls.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedUrls.length} selected
                    </Badge>
                  )}
                </div>

                <ScrollArea className="h-80 rounded-md border border-slate-200">
                  {filtered.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center py-10 text-center text-sm text-slate-400">
                      <Globe className="mb-2 h-8 w-8 text-slate-300" />
                      No URLs match your search
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {filtered.map((url) => (
                        <label
                          key={url}
                          className="flex cursor-pointer items-start gap-3 px-3 py-2.5 hover:bg-slate-50"
                        >
                          <Checkbox
                            className="mt-0.5"
                            checked={selectedUrls.includes(url)}
                            onCheckedChange={() => toggle(url)}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium text-slate-700">
                              {url}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {new URL(url).hostname}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onClose()}>
            Close
          </Button>
          {newUrls.length > 0 && (
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleIngest}
              disabled={submitting || selectedUrls.length === 0}
            >
              {submitting ? "Ingesting..." : `Ingest Selected (${selectedUrls.length})`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
