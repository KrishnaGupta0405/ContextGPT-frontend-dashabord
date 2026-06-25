"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileTypeIcon } from "@/components/FileTypeIcon";
import { Loader2, FolderOpen, ChevronRight, X, CheckSquare, Square } from "lucide-react";
import api from "@/lib/axios";

const MAX_DEPTH = 5;

// ─── Provider-specific folder fetcher ───────────────────────────────────────

async function fetchFolderContents(provider, folderRef, extraCtx) {
  const { endpoint, idKey, pathKey } = provider;

  if (provider.type === "dropbox") {
    const params = new URLSearchParams({ path: folderRef });
    const res = await api.get(`${endpoint}?${params}`);
    return res.data.data.files || [];
  }

  if (provider.type === "github") {
    const params = new URLSearchParams({ repo: extraCtx.repo });
    if (folderRef) params.set("path", folderRef);
    const res = await api.get(`${endpoint}?${params}`);
    return res.data.data.files || [];
  }

  if (provider.type === "sharepoint") {
    const params = new URLSearchParams({
      siteId: extraCtx.siteId,
      driveId: extraCtx.driveId,
    });
    if (folderRef && folderRef !== "root") params.set("folderId", folderRef);
    const res = await api.get(`${endpoint}?${params}`);
    return res.data.data.files || [];
  }

  if (provider.type === "mega") {
    const body = {
      email: extraCtx.email,
      password: extraCtx.password,
      folderId: folderRef,
    };
    const res = await api.post(endpoint, body);
    return res.data.data.files || [];
  }

  // Default: folderId-based (Google Drive, Box, OneDrive, iCloud)
  const params = new URLSearchParams({ [idKey]: folderRef });
  const res = await api.get(`${endpoint}?${params}`);
  return res.data.data.files || [];
}

// ─── Recursive scanner ───────────────────────────────────────────────────────

async function scanFolder(provider, folderRef, folderPath, depth, extraCtx, onProgress) {
  if (depth > MAX_DEPTH) return [];

  let items;
  try {
    items = await fetchFolderContents(provider, folderRef, extraCtx);
  } catch {
    return [];
  }

  const results = [];

  for (const item of items) {
    if (item.isFolder || item.isDrive) {
      const childRef =
        provider.type === "dropbox" ? item.path :
        provider.type === "github" ? item.path :
        item.id;

      const subPath = folderPath ? `${folderPath} / ${item.name}` : item.name;
      onProgress(subPath);

      const children = await scanFolder(provider, childRef, subPath, depth + 1, extraCtx, onProgress);
      results.push(...children);
    } else if (item.supported !== false && !item.isSite) {
      results.push({ ...item, folderPath });
    }
  }

  return results;
}

// ─── FolderScanModal ─────────────────────────────────────────────────────────

export function FolderScanModal({ folder, provider, extraCtx, onClose, onConfirm }) {
  const [phase, setPhase] = useState("scanning"); // "scanning" | "review"
  const [scanProgress, setScanProgress] = useState("");
  const [scannedFiles, setScannedFiles] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [scanError, setScanError] = useState(null);

  // Kick off scan immediately on mount
  const runScan = useCallback(async () => {
    setScanProgress(`Scanning ${folder.name}…`);

    const folderRef =
      provider.type === "dropbox" ? folder.path :
      provider.type === "github" ? folder.path :
      folder.id;

    try {
      const files = await scanFolder(
        provider,
        folderRef,
        folder.name,
        1,
        extraCtx,
        (path) => setScanProgress(`Scanning ${path}…`)
      );

      setScannedFiles(files);
      setSelectedIds(new Set(files.map((f) => f.id)));
      setPhase("review");
    } catch (err) {
      setScanError(err.message || "Scan failed");
      setPhase("review");
    }
  }, [folder, provider, extraCtx]);

  // Run scan once on mount
  React.useEffect(() => {
    runScan();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFile = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(scannedFiles.map((f) => f.id)));
  const deselectAll = () => setSelectedIds(new Set());

  const handleConfirm = () => {
    const selected = scannedFiles.filter((f) => selectedIds.has(f.id));
    onConfirm(selected);
  };

  // Group files by folderPath for display
  const grouped = scannedFiles.reduce((acc, file) => {
    const key = file.folderPath || folder.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(file);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-2xl flex-col rounded-xl border border-slate-200 bg-white shadow-2xl" style={{ maxHeight: "85vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-amber-500" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Import from folder: {folder.name}</p>
              <p className="text-xs text-slate-400">Up to {MAX_DEPTH} levels deep · supported files only</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {phase === "scanning" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16">
              <Loader2 className="h-7 w-7 animate-spin text-blue-500" />
              <p className="max-w-xs text-center text-sm text-slate-500">{scanProgress}</p>
              <p className="text-xs text-slate-400">This may take a moment for large folders…</p>
            </div>
          ) : scanError ? (
            <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-medium text-rose-600">Scan failed</p>
              <p className="mt-1 text-xs text-slate-400">{scanError}</p>
            </div>
          ) : scannedFiles.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-slate-500">No supported files found in this folder.</p>
              <p className="mt-1 text-xs text-slate-400">Only PDF, DOCX, TXT, CSV and similar file types are supported.</p>
            </div>
          ) : (
            <>
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2.5">
                <span className="text-xs text-slate-500">
                  {scannedFiles.length} file{scannedFiles.length !== 1 ? "s" : ""} found
                </span>
                <div className="flex items-center gap-3">
                  <button onClick={selectAll} className="flex items-center gap-1 text-xs text-blue-600 hover:underline">
                    <CheckSquare className="h-3.5 w-3.5" /> Select all
                  </button>
                  <button onClick={deselectAll} className="flex items-center gap-1 text-xs text-slate-500 hover:underline">
                    <Square className="h-3.5 w-3.5" /> Deselect all
                  </button>
                </div>
              </div>

              {/* File list */}
              <ScrollArea className="flex-1">
                {Object.entries(grouped).map(([groupName, groupFiles]) => (
                  <div key={groupName}>
                    {/* Group header — folder path */}
                    <div className="flex items-center gap-1 bg-slate-50 px-5 py-1.5">
                      {groupName.split(" / ").map((segment, i, arr) => (
                        <React.Fragment key={i}>
                          {i > 0 && <ChevronRight className="h-3 w-3 text-slate-300" />}
                          <span className={`text-xs ${i === arr.length - 1 ? "font-medium text-slate-600" : "text-slate-400"}`}>
                            {segment}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    {groupFiles.map((file) => (
                      <div
                        key={file.id}
                        onClick={() => toggleFile(file.id)}
                        className={`flex cursor-pointer items-center gap-3 border-b border-slate-100 px-5 py-2.5 last:border-b-0 hover:bg-blue-50/40 ${
                          selectedIds.has(file.id) ? "bg-blue-50" : ""
                        }`}
                      >
                        <Checkbox
                          checked={selectedIds.has(file.id)}
                          onCheckedChange={() => toggleFile(file.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0"
                        />
                        <FileTypeIcon
                          mimeType={file.mimeType}
                          fileName={file.name}
                          className="h-4 w-4 shrink-0"
                        />
                        <p className="flex-1 truncate text-sm text-slate-800">{file.name}</p>
                        {file.size && (
                          <span className="shrink-0 text-xs text-slate-400">
                            {file.size < 1024 * 1024
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </ScrollArea>
            </>
          )}
        </div>

        {/* Footer */}
        {phase === "review" && scannedFiles.length > 0 && (
          <div className="flex items-center gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-3">
            <Button
              onClick={handleConfirm}
              disabled={selectedIds.size === 0}
              size="sm"
              className="bg-blue-500 font-medium text-white hover:bg-blue-600 disabled:opacity-50"
            >
              Import {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            {selectedIds.size > 0 && (
              <span className="ml-auto text-xs text-slate-400">{selectedIds.size} file(s) selected</span>
            )}
          </div>
        )}
        {phase === "review" && scannedFiles.length === 0 && (
          <div className="flex justify-end border-t border-slate-200 px-5 py-3">
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}
