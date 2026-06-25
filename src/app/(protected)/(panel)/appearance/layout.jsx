import React from "react";
import { PanelNavbar } from "@/components/navbar/PanelNavbar";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function AppearanceLayout({ children, middle, right }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <PanelNavbar
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Appearance" },
        ]}
      />
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={65} minSize={30} className="overflow-y-auto">
            {middle}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} minSize={20} className="hidden lg:block overflow-y-auto">
            <div className="flex items-start justify-center h-full">
              {right}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
