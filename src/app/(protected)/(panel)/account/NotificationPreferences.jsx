"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Bell, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

const SECTIONS = [
  {
    title: "Security & Account",
    items: [
      { key: "notifyNewLogin", label: "New login detected" },
      { key: "notifyPasswordChanged", label: "Password changed" },
      { key: "notifySessionRevoked", label: "Session signed out" },
      { key: "notifyAccountDetailsUpdated", label: "Account details updated" },
      { key: "notifyApiKeyGenerated", label: "API key generated" },
      { key: "notifyApiKeyRevoked", label: "API key revoked" },
    ],
  },
  {
    title: "Team & Workspace",
    items: [
      { key: "notifyTeamInvite", label: "Team invite received" },
      { key: "notifyTeamMemberRemoved", label: "Removed from workspace" },
      { key: "notifyTeamMemberRoleUpdated", label: "Role changed" },
      { key: "notifyChatbotMemberRemoved", label: "Removed from chatbot" },
    ],
  },
  {
    title: "Billing",
    items: [
      { key: "notifyPaymentSuccess", label: "Payment successful" },
      { key: "notifyPaymentFailed", label: "Payment failed" },
      { key: "notifySubscriptionUpgraded", label: "Plan upgraded" },
      { key: "notifySubscriptionDowngraded", label: "Plan downgrade scheduled" },
      { key: "notifySubscriptionCanceled", label: "Subscription canceled" },
      { key: "notifySubscriptionPaused", label: "Subscription paused" },
      { key: "notifySubscriptionResumed", label: "Subscription resumed" },
      { key: "notifySubscriptionPastDue", label: "Subscription past due" },
      { key: "notifyAddonPurchaseSuccess", label: "Add-on purchased" },
      { key: "notifyAddonPaymentFailed", label: "Add-on payment failed" },
      { key: "notifyTransactionRefunded", label: "Refund processed" },
    ],
  },
  {
    title: "Chatbot & Integrations",
    items: [
      { key: "notifyChatbotSettingsUpdated", label: "Chatbot settings updated" },
      { key: "notifyIntegrationConnected", label: "Integration connected / updated" },
      { key: "notifyIntegrationToggled", label: "Integration enabled / disabled" },
      { key: "notifyIntegrationDisconnected", label: "Integration disconnected" },
    ],
  },
];

export const NotificationPreferences = () => {
  const [notifPrefs, setNotifPrefs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNotifPrefs = async () => {
      try {
        setLoading(true);
        const response = await api.get("/users/notification-preferences");
        if (response.data.success) {
          setNotifPrefs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching notification preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifPrefs();
  }, []);

  const togglePref = (key) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.patch("/users/notification-preferences", notifPrefs);
      if (response.data.success) {
        setNotifPrefs(response.data.data);
        toast.success("Notification preferences saved!");
      }
    } catch (error) {
      console.error("Error saving notification preferences:", error);
      toast.error("Failed to save notification preferences.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-slate-500" />
          Email Notifications
        </CardTitle>
        <CardDescription>
          Choose which emails you want to receive. Critical emails (verification, password reset, account deletion) are always sent.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        ) : notifPrefs ? (
          SECTIONS.map((section, idx) => (
            <div key={section.title} className={`space-y-3 ${idx > 0 ? "border-t pt-4" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{section.title}</p>
              {section.items.map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="cursor-pointer text-sm font-normal text-slate-700">
                    {label}
                  </Label>
                  <Switch id={key} checked={!!notifPrefs[key]} onCheckedChange={() => togglePref(key)} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">Failed to load notification preferences.</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-6">
        <Button onClick={handleSave} disabled={loading || saving || !notifPrefs}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
