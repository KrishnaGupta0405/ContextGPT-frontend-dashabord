"use client";

import React, { useState } from "react";
import { PanelNavbar } from "@/components/navbar/PanelNavbar";
import { Terminal } from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";
import { ShikiCodeBlock } from "@/components/ui/ShikiCodeBlock";

function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-[14px] border border-slate-200 bg-[#f4f7fc] p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[12px] font-mono text-slate-700">
      {children}
    </code>
  );
}

function InfoBanner({ children, color = "blue" }) {
  const styles = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-100 text-yellow-700",
    red: "bg-red-50 border-red-100 text-red-700",
    green: "bg-green-50 border-green-100 text-green-700",
  };
  return (
    <div className={`rounded-[8px] border px-4 py-3 text-[13.5px] leading-relaxed ${styles[color]}`}>
      {children}
    </div>
  );
}

const SECTIONS = [
  { id: "quick-nav", label: "Overview" },
  { id: "widget-visibility", label: "Widget Visibility" },
  { id: "send-messages", label: "Send Messages" },
  { id: "conversation-reset", label: "Reset Conversation" },
  { id: "widget-reload", label: "Reload Widget" },
  { id: "user-session", label: "User Sessions" },
  { id: "context", label: "Chatbot Context" },
  { id: "custom-css", label: "Custom CSS" },
  { id: "hidebtn", label: "hideButton Mode" },
  { id: "container-mode", label: "Container Mode" },
  { id: "multi-widget", label: "Multiple Widgets" },
];

export default function SdkAdvanced() {
  const { selectedChatbot } = useChatbot();
  const chatbotId = selectedChatbot?.id ?? "YOUR_CHATBOT_ID";
  const [activeSection, setActiveSection] = useState("quick-nav");

  const scriptTag = `<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js"
  data-chatbot-id="${chatbotId}">
</script>`;

  const scriptTagHideButton = `<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js?hideButton=true"
  data-chatbot-id="${chatbotId}">
</script>`;

  return (
    <div className="flex h-full flex-col">
      <PanelNavbar
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Installation" },
          { label: "SDK Advanced" },
        ]}
      />

      <div className="flex-1 overflow-y-auto p-4 pt-6 md:p-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-[28px] font-bold tracking-tight text-slate-900">
              SDK Methods ($cgpt)
            </h2>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-[12px] font-semibold text-yellow-700">
              Advanced
            </span>
          </div>
          <p className="text-[14px] text-slate-500">
            Advanced programmatic control of the chatbot widget
          </p>
        </div>

        {/* Warning Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-[12px] border border-yellow-200 bg-yellow-50 p-4">
          <span className="mt-0.5 text-yellow-500 text-lg">⚠️</span>
          <div>
            <p className="text-[13.5px] font-bold text-yellow-800">For Advanced Users Only</p>
            <p className="mt-0.5 text-[13px] text-yellow-700">
              These methods require JavaScript knowledge and are intended for developers who need programmatic control over the chatbot. Most users should stick to the standard{" "}
              <a href="/installation/website-integration" className="underline font-semibold">
                Installation Guide
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Sticky sidebar nav */}
          <div className="hidden xl:block w-52 shrink-0">
            <div className="fixed top-[20rem] rounded-[12px] border border-slate-200 bg-white p-3">
              <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                On this page
              </p>
              <nav className="space-y-0.5">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActiveSection(s.id)}
                    className={`block rounded-md px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                      activeSection === s.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0 flex-1 space-y-5">

            {/* Overview */}
            <SectionCard id="quick-nav">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <Terminal className="h-4 w-4 text-blue-600" />
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    What are $cgpt Methods?
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    The <InlineCode>$cgpt</InlineCode> object lets you interact with and control the ContextGPT chatbot widget from anywhere on your page. Use it to customize appearance, provide context, manage user sessions, and control widget visibility programmatically.
                  </p>
                  <p className="mb-3 text-[13.5px] text-slate-600">
                    Commands are sent using the <InlineCode>push</InlineCode> method:
                  </p>
                  <ShikiCodeBlock lang="js" code={`window.$cgpt.push([command, ...args]);`} />

                  <p className="mt-4 mb-3 text-[13.5px] font-semibold text-slate-700">
                    You can queue commands before the script loads — they'll replay automatically:
                  </p>
                  <ShikiCodeBlock lang="js" code={`// Queue commands BEFORE the script tag loads
window.$cgpt = window.$cgpt || [];
window.$cgpt.push(['set', 'context', ['You are a sales bot.', 'Page: Pricing']]);
window.$cgpt.push(['open']);

// Then load the widget
// <script type="module" src="...loader.js" data-chatbot-id="${chatbotId}"></script>`} />

                  <div className="mt-5 overflow-hidden rounded-[10px] border border-slate-200">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                          <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Command</th>
                          <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Syntax</th>
                          <th className="px-4 py-2.5 text-left font-semibold text-slate-700">What it does</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {[
                          ["open", "$cgpt.push(['open'])", "Opens the widget"],
                          ["open + reset", "$cgpt.push(['open', { reset: true }])", "Resets conversation then opens"],
                          ["close", "$cgpt.push(['close'])", "Closes the widget"],
                          ["toggle", "$cgpt.push(['toggle'])", "Toggles open/close"],
                          ["message:send", "$cgpt.push(['do', 'message:send', 'text'])", "Sends a message, opens widget"],
                          ["message:text", "$cgpt.push(['set', 'message:text', 'text'])", "Prefills input field"],
                          ["conversation:reset", "$cgpt.push(['do', 'conversation:reset'])", "Resets conversation"],
                          ["widget:reload", "$cgpt.push(['do', 'widget:reload'])", "Tears down and remounts widget"],
                          ["user:email", "$cgpt.push(['set', 'user:email', [email, sig]])", "Logs user in with HMAC signature"],
                          ["context", "$cgpt.push(['set', 'context', [prefix, suffix]])", "Injects extra context into chat"],
                          ["css", "$cgpt.push(['set', 'css', 'css_string'])", "Injects custom CSS into widget"],
                        ].map(([cmd, syntax, desc]) => (
                          <tr key={cmd} className="hover:bg-slate-50/60">
                            <td className="px-4 py-2.5">
                              <InlineCode>{cmd}</InlineCode>
                            </td>
                            <td className="px-4 py-2.5 font-mono text-[11.5px] text-slate-600">{syntax}</td>
                            <td className="px-4 py-2.5 text-slate-600">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Widget Visibility */}
            <SectionCard id="widget-visibility">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Control Widget Visibility
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Programmatically open, close, or toggle the chat widget. Especially useful when you've hidden the default bubble with <InlineCode>hideButton=true</InlineCode>.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Open the chat</p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['open'])`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Open with fresh conversation</p>
                      <p className="mb-2.5 text-[13px] text-slate-500">Opens the chat and resets the conversation in a single flicker-free step.</p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['open', { reset: true }])`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Close the chat</p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['close'])`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Toggle the chat</p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['toggle'])`} />
                    </div>

                    <InfoBanner color="blue">
                      💡 <strong>Example:</strong> Open the chat when a custom button is clicked:
                      <ShikiCodeBlock lang="html" code={`<button onclick="window.$cgpt.push(['open'])">
  Chat with us
</button>`} className="mt-2" />
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Send Messages */}
            <SectionCard id="send-messages">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L64.87,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.92-2.1l167.92-96.05a16,16,0,0,0,.03-27.85ZM56,224a.56.56,0,0,0,0-.12L79.77,136H136a8,8,0,0,0,0-16H79.77L56,32.12Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Send Messages Programmatically
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Send a message to the chatbot immediately, or prefill the input field so the user can review before sending.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[13.5px] font-semibold text-slate-800">Send a message immediately</span>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">Auto-opens widget</span>
                      </div>
                      <p className="mb-2.5 text-[13px] text-slate-500">
                        Sends a message to the chatbot immediately. The widget opens automatically if it's closed.
                      </p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['do', 'message:send', 'message_text'])`} />
                      <p className="mt-3 mb-2 text-[13px] font-medium text-slate-600">Example — send a message when a button is clicked:</p>
                      <ShikiCodeBlock lang="js" code={`document.getElementById('pricing-btn').addEventListener('click', function() {
  window.$cgpt.push(['do', 'message:send', 'What are your pricing plans?'])
})`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Prefill the message input</span>
                      <p className="mt-1.5 mb-2.5 text-[13px] text-slate-500">
                        Prefills the input field with text. The user can edit the message before sending.
                      </p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['set', 'message:text', 'text_string'])`} />
                      <p className="mt-3 mb-2 text-[13px] font-medium text-slate-600">Example:</p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['set', 'message:text', "Hi! I'd like to get help with..."])`} />
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Reset Conversation */}
            <SectionCard id="conversation-reset">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43C98,49.94,73,62,55.14,83.09a8,8,0,1,1-12-10.56C63.65,49.3,94.72,33.86,126,34a95.43,95.43,0,0,1,67.07,28L208,76.69V48a8,8,0,0,1,16,0ZM174.86,172.91C157,194,132,206.06,104.07,206.06A79.56,79.56,0,0,1,48,182.63L33.31,168H62a8,8,0,0,0,0-16H14a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.93,14.93A95.44,95.44,0,0,0,104,222c.74,0,1.48,0,2.22,0,31.16-.28,62.05-15.74,82.6-39.53a8,8,0,1,0-12-10.56Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Reset Conversation
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Start a fresh conversation by clearing the thread and returning to the home page. Useful for "Start New Conversation" or "Reset Chat" buttons.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Reset the conversation</span>
                      <p className="mt-1.5 mb-2.5 text-[13px] text-slate-500">
                        Clears the conversation history. The widget opens automatically if it's closed.
                      </p>
                      <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['do', 'conversation:reset'])`} />
                      <p className="mt-3 mb-2 text-[13px] font-medium text-slate-600">Example:</p>
                      <ShikiCodeBlock lang="js" code={`document.getElementById('reset-btn').addEventListener('click', function() {
  window.$cgpt.push(['do', 'conversation:reset'])
})`} />
                    </div>

                    <InfoBanner color="blue">
                      💡 <strong>Tip:</strong> To reset and open in a single flicker-free step, use{" "}
                      <InlineCode>{`window.$cgpt.push(['open', { reset: true }])`}</InlineCode> instead.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Widget Reload */}
            <SectionCard id="widget-reload">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M240,56v48a8,8,0,0,1-8,8H184a8,8,0,0,1,0-16h28.69L197.25,80.64a80,80,0,1,0,1.67,114.78,8,8,0,0,1,11.16,11.46A96,96,0,1,1,195.75,68L212,84.52V56a8,8,0,0,1,16,0Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Reload Widget
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Completely reinitializes the widget by removing all existing elements and recreating them from scratch. Useful after page navigation or dynamic content changes.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Reinitialize the widget</span>
                      <div className="mt-2 mb-2.5">
                        <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['do', 'widget:reload'])`} />
                      </div>
                      <p className="mt-3 mb-2 text-[13px] font-medium text-slate-600">Example — reload on SPA route change:</p>
                      <ShikiCodeBlock lang="js" code={`router.on('routeChange', function(newRoute) {
  setTimeout(function() {
    window.$cgpt.push(['do', 'widget:reload'])
  }, 100)
})`} />
                    </div>

                    <InfoBanner color="blue">
                      💡 <strong>When to use widget:reload</strong>
                      <ul className="mt-1.5 list-disc pl-5 space-y-0.5 text-[13px]">
                        <li>After client-side navigation in SPAs (React, Vue, etc.)</li>
                        <li>When embed containers appear/disappear dynamically</li>
                        <li>To ensure widgets detect new containers after DOM changes</li>
                      </ul>
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* User Sessions */}
            <SectionCard id="user-session">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0C192.23,166.81,215.7,185.69,230.93,212A8,8,0,0,1,230.93,220ZM128,144a56,56,0,1,0-56-56A56.06,56.06,0,0,0,128,144Zm0,16c-30.36,0-58.21,15.43-75.87,41.5h151.75C186.21,175.43,158.36,160,128,160Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Manage User Sessions
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Automatically log the user into the chatbot widget using their verified email address. This requires generating a secure signature on your backend.
                  </p>

                  <InfoBanner color="red">
                    🔒 <strong>Security Warning:</strong> Never generate signatures in front-end code. Doing so would expose your API key and allow anyone to impersonate users. Always generate signatures on your backend server.
                  </InfoBanner>

                  <div className="mt-4 space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Frontend — send signed email to widget</span>
                      <div className="mt-2.5">
                        <ShikiCodeBlock lang="js" code={`window.$cgpt.push([
  'set',
  'user:email',
  [
    'user@company.com',
    'cd7cc422ca57c82d...' // HMAC-SHA256 signature generated on your backend
  ]
])`} />
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Backend — generate the HMAC-SHA256 signature (Node.js)</span>
                      <div className="mt-2.5">
                        <ShikiCodeBlock lang="js" code={`const crypto = require("crypto")

// Your ContextGPT API key (keep it private — never expose in frontend)
const apiKey = 'your-api-key-here'

// Sign the user's email using HMAC-SHA256
function signEmail(email) {
  return crypto.createHmac('sha256', apiKey).update(email).digest('hex')
}

// Get the logged-in user's email from your session
const userEmail = getEmailFromSession()
const signature = signEmail(userEmail)

// Send signature to your frontend securely (e.g. via API response or SSR)`} />
                      </div>
                    </div>

                    <InfoBanner color="blue">
                      💡 Once the signed email is pushed, the user is automatically logged in and their conversation history is restored.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Context */}
            <SectionCard id="context">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V88H40ZM40,200V104H216v96Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Enhance Chatbot Context
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Provide additional context to the chatbot for more relevant and personalized conversations — such as the current page the user is on, or a custom persona.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Syntax</span>
                      <div className="mt-2">
                        <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['set', 'context', ['prefix', 'suffix']])`} />
                      </div>
                      <ul className="mt-3 space-y-1 text-[13px] text-slate-500">
                        <li><strong className="text-slate-700">prefix</strong> — injected before the user's message (custom persona, role)</li>
                        <li><strong className="text-slate-700">suffix</strong> — injected after the user's message (page context, URL)</li>
                      </ul>
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Example — page-aware context</span>
                      <div className="mt-2">
                        <ShikiCodeBlock lang="js" code={`window.$cgpt.push([
  'set',
  'context',
  [
    "You are a sales executive. Guide users to book a demo call.", // Prefix (persona)
    "Current Page: Pricing Page \\nURL: https://example.com/pricing"  // Suffix (page info)
  ]
])`} />
                      </div>
                    </div>

                    <InfoBanner color="blue">
                      💡 Context is injected transparently — users only see their original message in the chat UI.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Custom CSS */}
            <SectionCard id="custom-css">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M208,24H48A16,16,0,0,0,32,40V216a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24ZM84.69,164.69a8,8,0,0,1-11.38-11.38L100.59,128,73.31,102.69A8,8,0,0,1,84.69,91.31l32,30a8,8,0,0,1,0,11.38ZM176,168H128a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Customize Widget Appearance
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    Apply your own CSS to the chatbot widget to match your branding. Styles are injected into the widget's shadow DOM.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Syntax</span>
                      <div className="mt-2">
                        <ShikiCodeBlock lang="js" code={`window.$cgpt.push(['set', 'css', 'css_string'])`} />
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Examples</span>
                      <div className="mt-2 space-y-3">
                        <ShikiCodeBlock lang="js" code={`// Change the primary brand color
window.$cgpt.push(['set', 'css', ':root { --chat-color: #10b981; }'])`} />
                        <ShikiCodeBlock lang="js" code={`// Change the font family
window.$cgpt.push(['set', 'css', 'body { font-family: "Lato", sans-serif; }'])`} />
                      </div>
                    </div>

                    <InfoBanner color="blue">
                      💡 CSS is applied reactively — calling this command again with new CSS replaces the previous custom styles.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* hideButton */}
            <SectionCard id="hidebtn">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L58.93,63.8A96,96,0,0,0,68.4,216.49a8,8,0,0,0,7.2-14.31A80,80,0,0,1,64.14,75.17l17.35,19.27A56,56,0,0,0,143,172.88l11.56,12.84a96,96,0,0,1-90.56-8.6,8,8,0,0,0-8.88,13.32A112,112,0,0,0,202.08,210.38l12,13.31a8,8,0,1,0,11.84-10.76ZM128,168a40,40,0,0,1-28.57-68l55.4,61.51A39.8,39.8,0,0,1,128,168Zm0-160A112.12,112.12,0,0,0,42.54,51.7a8,8,0,1,0,12.28,10.26A96,96,0,0,1,192,128c0,9.07-1.28,17.86-3.7,26.2a8,8,0,1,0,15.41,4.4A111.66,111.66,0,0,0,208,128,112.13,112.13,0,0,0,128,8Zm0,48a79.4,79.4,0,0,0-28.38,5.19,8,8,0,1,0,5.71,14.93A63.44,63.44,0,0,1,128,72a64.08,64.08,0,0,1,64,64,63.28,63.28,0,0,1-1.74,14.9,8,8,0,1,0,15.53,3.88A79.28,79.28,0,0,0,208,136,80.09,80.09,0,0,0,128,56Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Programmatic-Only Mode (hideButton)
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    If you want the widget to exist but only be openable via programmatic commands (no visible bubble), add <InlineCode>hideButton=true</InlineCode> to the script URL. Useful when you have a custom trigger element.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <span className="text-[13.5px] font-semibold text-slate-800">Example — custom trigger button</span>
                      <div className="mt-2.5 space-y-3">
                        <ShikiCodeBlock lang="html" code={`<!-- Your custom trigger button -->
<button id="my-chat-btn" onclick="window.$cgpt.push(['open'])">
  Chat with us
</button>

<!-- Load widget with hideButton — no bubble shown -->
${scriptTagHideButton}`} />
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[10px] border border-slate-200">
                      <table className="w-full text-[13px]">
                        <thead>
                          <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Parameter</th>
                            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Floating Widget</th>
                            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Bubble Button</th>
                            <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Use Case</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50/60">
                            <td className="px-4 py-2.5"><InlineCode>(none)</InlineCode></td>
                            <td className="px-4 py-2.5 text-green-600 font-semibold">✅ Created</td>
                            <td className="px-4 py-2.5 text-green-600 font-semibold">✅ Visible</td>
                            <td className="px-4 py-2.5 text-slate-600">Default behavior</td>
                          </tr>
                          <tr className="hover:bg-slate-50/60">
                            <td className="px-4 py-2.5"><InlineCode>?hideButton=true</InlineCode></td>
                            <td className="px-4 py-2.5 text-green-600 font-semibold">✅ Created</td>
                            <td className="px-4 py-2.5 text-red-500 font-semibold">❌ Hidden</td>
                            <td className="px-4 py-2.5 text-slate-600">Programmatic control only</td>
                          </tr>
                          <tr className="hover:bg-slate-50/60">
                            <td className="px-4 py-2.5"><InlineCode>?hideWidget=true</InlineCode></td>
                            <td className="px-4 py-2.5 text-red-500 font-semibold">❌ Not created</td>
                            <td className="px-4 py-2.5 text-red-500 font-semibold">❌ Not created</td>
                            <td className="px-4 py-2.5 text-slate-600">Embedded containers only</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <InfoBanner color="blue">
                      💡 The widget is created and ready to receive commands, but the bubble and tooltip are hidden. Users can still close the widget using the close button inside it.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Container Mode (Embedded Widgets) */}
            <SectionCard id="container-mode">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H216V88H40ZM40,200V104H216v96Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Container Mode (Embedded Widgets)
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    By default, the widget appears as a floating chat bubble. You can embed the widget inside a specific container element on your page using <InlineCode>data-mode="embedded"</InlineCode> and <InlineCode>data-container</InlineCode> attributes on the script tag.
                  </p>

                  <div className="space-y-4">
                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Single Embedded Widget <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-700 ml-1">Recommended</span></p>
                      <p className="mb-2.5 text-[13px] text-slate-500">Create a container element and point the script at it. The widget fills the container instead of floating over the page.</p>
                      <ShikiCodeBlock lang="html" code={`<!-- Create a container element -->
<div id="my-chat-container" style="width: 100%; height: 600px;"></div>

<!-- Load the widget script pointing to that container -->
<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js"
  data-chatbot-id="${chatbotId}"
  data-mode="embedded"
  data-container="#my-chat-container">
</script>`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Multiple Instances of the Same Chatbot</p>
                      <p className="mb-2.5 text-[13px] text-slate-500">You can embed the same chatbot into multiple containers. Each gets its own isolated widget instance. Load the script once per container.</p>
                      <ShikiCodeBlock lang="html" code={`<!-- Container 1 -->
<div id="chat-sidebar" style="width: 100%; height: 400px;"></div>

<!-- Container 2 -->
<div id="chat-inline" style="width: 100%; height: 400px;"></div>

<!-- Load once per container, each pointing to its own container -->
<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=sidebar"
  data-chatbot-id="${chatbotId}"
  data-mode="embedded"
  data-container="#chat-sidebar"
  data-instance="sidebar">
</script>

<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=inline"
  data-chatbot-id="${chatbotId}"
  data-mode="embedded"
  data-container="#chat-inline"
  data-instance="inline">
</script>`} />
                    </div>

                    <InfoBanner color="blue">
                      <p className="font-semibold mb-1">How Container Mode Works</p>
                      <ul className="mt-1 list-disc pl-5 space-y-1 text-[13px]">
                        <li>Use <InlineCode>data-mode="embedded"</InlineCode> with <InlineCode>data-container="#selector"</InlineCode> to embed the widget inside a specific element.</li>
                        <li>The floating bubble is automatically suppressed — the widget opens immediately inside the container.</li>
                        <li>To suppress the floating bubble globally when using embedded containers only, add <InlineCode>?hideWidget=true</InlineCode> to the floating script URL.</li>
                        <li>Each container gets its own isolated widget instance with its own state.</li>
                      </ul>
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Multiple Widgets & Widget-Specific Commands */}
            <SectionCard id="multi-widget">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#155ded" viewBox="0 0 256 256"><path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM56,40H200V88H56ZM200,216H56V104H200Zm-88-72a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H120A8,8,0,0,1,112,144Zm0,32a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H120A8,8,0,0,1,112,176ZM80,144a12,12,0,1,1-12-12A12,12,0,0,1,80,144Zm0,32a12,12,0,1,1-12-12A12,12,0,0,1,80,176Z"></path></svg>
                </div>
                <div className="min-w-0 w-full">
                  <h4 className="mb-1 text-[14.5px] font-bold text-slate-900">
                    Multiple Widgets &amp; Widget-Specific Commands
                  </h4>
                  <p className="mb-4 text-[13.5px] leading-relaxed text-blue-600/80">
                    When you have multiple widget instances on the same page, you can target commands at a specific instance using the instance name or chatbot ID — instead of broadcasting to all widgets.
                  </p>

                  <div className="space-y-4">

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Targeting API Overview</p>
                      <div className="overflow-hidden rounded-[8px] border border-slate-200 mt-2">
                        <table className="w-full text-[13px]">
                          <thead>
                            <tr className="border-b border-slate-200 bg-slate-50">
                              <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Target</th>
                              <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Syntax</th>
                              <th className="px-4 py-2.5 text-left font-semibold text-slate-700">Scope</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              ["$cgpt.push", "window.$cgpt.push([...])", "Broadcasts to ALL widgets on the page"],
                              ["$cgpt['instanceName']", "window.$cgpt['floating'].push([...])", "One specific widget by its data-instance name"],
                              ["$cgpt_widget['chatbotId']", `window.$cgpt_widget['${chatbotId}'].push([...])`, "All instances sharing that chatbot ID"],
                              ["$cgpt_widget['chatbotId']['instanceName']", `window.$cgpt_widget['${chatbotId}']['floating'].push([...])`, "One specific instance within a chatbot ID group"],
                            ].map(([target, syntax, scope]) => (
                              <tr key={target} className="hover:bg-slate-50/60">
                                <td className="px-4 py-2.5 font-mono text-[11.5px] text-slate-700 whitespace-nowrap">{target}</td>
                                <td className="px-4 py-2.5 font-mono text-[11px] text-slate-500">{syntax}</td>
                                <td className="px-4 py-2.5 text-slate-600">{scope}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Target by Instance Name</p>
                      <p className="mb-2.5 text-[13px] text-slate-500">
                        Give each script tag a <InlineCode>data-instance</InlineCode> name, then use that name to send commands to just that widget.
                      </p>
                      <ShikiCodeBlock lang="html" code={`<!-- Two widgets on the same page with different instance names -->
<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=floating"
  data-chatbot-id="${chatbotId}"
  data-instance="floating">
</script>

<script
  type="module"
  src="https://contextgpt-widget-testing.vercel.app/loader.js?instance=embedded"
  data-chatbot-id="${chatbotId}"
  data-mode="embedded"
  data-container="#chat-container"
  data-instance="embedded">
</script>

<!-- Target only the floating widget -->
<script>
  window.$cgpt['floating'].push(['open'])
</script>

<!-- Target only the embedded widget -->
<script>
  window.$cgpt['embedded'].push(['set', 'message:text', 'Hello!'])
</script>`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Target by Chatbot ID</p>
                      <p className="mb-2.5 text-[13px] text-slate-500">
                        Use <InlineCode>$cgpt_widget</InlineCode> to send commands to all instances of a specific chatbot, or to one specific instance within that chatbot.
                      </p>
                      <ShikiCodeBlock lang="js" code={`// Send a command to ALL instances of this chatbot
window.$cgpt_widget['${chatbotId}'].push(['set', 'css', ':host { --cgpt-primary: #10b981; }'])

// Send a command to the "floating" instance of this chatbot only
window.$cgpt_widget['${chatbotId}']['floating'].push(['open'])

// Send a command to the "embedded" instance only
window.$cgpt_widget['${chatbotId}']['embedded'].push(['set', 'message:text', 'Only embedded gets this!'])`} />
                    </div>

                    <div className="rounded-[10px] border border-slate-200 bg-white p-4">
                      <p className="mb-2 text-[13.5px] font-semibold text-slate-800">Global Broadcast — All Widgets</p>
                      <p className="mb-2.5 text-[13px] text-slate-500">
                        Calling <InlineCode>window.$cgpt.push([...])</InlineCode> without an instance name broadcasts the command to every widget on the page.
                      </p>
                      <ShikiCodeBlock lang="js" code={`// Open all widgets at once
window.$cgpt.push(['open'])

// Apply a CSS theme to every widget
window.$cgpt.push(['set', 'css', ':host { --cgpt-primary: #6366f1; }'])

// Prefill input on all widgets
window.$cgpt.push(['set', 'message:text', 'Hello from broadcast!'])`} />
                    </div>

                    <InfoBanner color="blue">
                      💡 Commands pushed before any widget loads are buffered and replayed automatically once the widget is ready — all targeting modes work with pre-load queuing.
                    </InfoBanner>
                  </div>
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </div>
    </div>
  );
}
