"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",

        // Success – modern green
        "--success-bg": "#f0fdf4",
        "--success-text": "#166534",
        "--success-border": "#86efac",

        // Info – modern blue
        "--info-bg": "#f0f9ff",
        "--info-text": "#0c4a6e",
        "--info-border": "#7dd3fc",

        // Warning – modern amber
        "--warning-bg": "#fefce8",
        "--warning-text": "#7c2d12",
        "--warning-border": "#fcd34d",

        // Error – modern red
        "--error-bg": "#fef2f2",
        "--error-text": "#7f1d1d",
        "--error-border": "#fca5a5",
      }}
      closeButton={true}
      {...props}
    />
  );
};

export { Toaster };
