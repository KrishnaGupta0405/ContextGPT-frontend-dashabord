"use client";

import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import api from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export const useMemberUsage = () => {
  const { account } = useAuth();
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account?.id) return;
    setLoading(true);
    api
      .get(`/teams/account/${account.id}/members/usage`)
      .then((res) => {
        if (res.data.success) setUsage(res.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [account?.id]);

  const atLimit = usage ? usage.used >= usage.allowed : false;
  return { usage, atLimit, loading };
};

export const MemberUsageBadge = () => {
  const { usage, atLimit, loading } = useMemberUsage();

  if (loading) return <Skeleton className="h-9 w-36 rounded-lg" />;

  const { used = 0, allowed = 0 } = usage ?? {};

  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
        atLimit
          ? "border-red-200 bg-red-50 text-red-600"
          : "border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      <Users className="h-4 w-4 shrink-0" />
      <span>
        <span className="font-semibold">{used}</span>
        <span className="mx-0.5 text-gray-400">/</span>
        <span className="font-semibold">{allowed}</span>
        <span className="ml-1.5 text-xs font-normal text-gray-400">members used</span>
      </span>
    </div>
  );
};
