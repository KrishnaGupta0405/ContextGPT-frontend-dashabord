export const FEATURE_CATEGORIES = [
  {
    id: "training",
    label: "Training & Customization",
    description:
      "Train your AI chatbot on your specific content and fine-tune its behavior, tone, and response style to match your brand.",
    features: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34Zm-56,67.32a8,8,0,0,1-11.32,0L136,139.31V184a8,8,0,0,1-16,0V139.31l-10.34,10.35a8,8,0,0,1-11.32-11.32l24-24a8,8,0,0,1,11.32,0l24,24A8,8,0,0,1,157.66,149.66ZM152,88V44l44,44Z"></path></svg>
        ),
        title: "Import Knowledge Sources",
        description:
          "Add website URLs, upload documents, or paste text directly to keep your chatbot informed with the information that matters most.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M225.86,102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.56-1.47-7.63-5.37-11.57-9.14C146.28,23.51,138.44,16,128,16s-18.27,7.51-25.18,14.14c-3.94,3.77-8,7.67-11.57,9.14C88,40.64,82.56,40.72,77.31,40.8c-9.76.15-20.82.31-28.51,8S41,67.55,40.8,77.31c-.08,5.25-.16,10.67-1.52,13.94-1.47,3.56-5.37,7.63-9.14,11.57C23.51,109.72,16,117.56,16,128s7.51,18.27,14.14,25.18c3.77,3.94,7.67,8,9.14,11.57,1.36,3.27,1.44,8.69,1.52,13.94.15,9.76.31,20.82,8,28.51s18.75,7.85,28.51,8c5.25.08,10.67.16,13.94,1.52,3.56,1.47,7.63,5.37,11.57,9.14C109.72,232.49,117.56,240,128,240s18.27-7.51,25.18-14.14c3.94-3.77,8-7.67,11.57-9.14,3.27-1.36,8.69-1.44,13.94-1.52,9.76-.15,20.82-.31,28.51-8s7.85-18.75,8-28.51c.08-5.25.16-10.67,1.52-13.94,1.47-3.56,5.37-7.63,9.14-11.57C232.49,146.28,240,138.44,240,128S232.49,109.73,225.86,102.82ZM128,192a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"></path></svg>
        ),
        title: "Conversation-Based Training",
        description:
          "Improve responses using real customer conversations and feedback, helping your chatbot become more accurate over time.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M224.32,114.24a56,56,0,0,0-60.07-76.57A56,56,0,0,0,67.93,51.44a56,56,0,0,0-36.25,90.32A56,56,0,0,0,69,217,56.39,56.39,0,0,0,83.59,219a55.75,55.75,0,0,0,8.17-.61,56,56,0,0,0,96.31-13.78,56,56,0,0,0,36.25-90.32Zm-80.32,23-16,9.24-16-9.24V118.76l16-9.24,16,9.24Zm38.85-82.81a40,40,0,0,1,28.56,48c-.95-.63-1.91-1.24-2.91-1.81L164,74.88a8,8,0,0,0-8,0l-44,25.41V81.81l40.5-23.38A39.76,39.76,0,0,1,182.85,54.43Zm-142,32.5A39.75,39.75,0,0,1,64.12,68.57C64.05,69.71,64,70.85,64,72v51.38a8,8,0,0,0,4,6.93l44,25.4L96,165,55.5,141.57A40,40,0,0,1,40.86,86.93ZM136,224a39.79,39.79,0,0,1-27.52-10.95c1-.51,2-1.05,3-1.63L156,185.73a8,8,0,0,0,4-6.92V128l16,9.24V184A40,40,0,0,1,136,224Z"></path></svg>
        ),
        title: "GPT-4.1-mini & GPT-4.1",
        description:
          "Select between fast, cost-efficient responses or deeper, more advanced reasoning depending on your chatbot's needs.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM115.7,192.49a43.31,43.31,0,0,1-55-66.43l25.37-25.37a43.35,43.35,0,0,1,61.25,0,42.9,42.9,0,0,1,9.95,15.43,8,8,0,1,1-15,5.6A27.33,27.33,0,0,0,97.37,112L72,137.37a27.32,27.32,0,0,0,34.68,41.91,8,8,0,1,1,9,13.21Zm79.61-62.55-25.37,25.37A43,43,0,0,1,139.32,168h0a43.35,43.35,0,0,1-40.53-28.12,8,8,0,1,1,15-5.6A27.35,27.35,0,0,0,139.28,152h0a27.14,27.14,0,0,0,19.32-8L184,118.63a27.32,27.32,0,0,0-34.68-41.91,8,8,0,1,1-9-13.21,43.32,43.32,0,0,1,55,66.43Z"></path></svg>
        ),
        title: "Website Embedding",
        description:
          "Deploy your chatbot across landing pages, product sites, customer portals, and help centers with a simple embed.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M200.77,53.89A103.27,103.27,0,0,0,128,24h-1.07A104,104,0,0,0,24,128c0,43,26.58,79.06,69.36,94.17A32,32,0,0,0,136,192a16,16,0,0,1,16-16h46.21a31.81,31.81,0,0,0,31.2-24.88,104.43,104.43,0,0,0,2.59-24A103.28,103.28,0,0,0,200.77,53.89ZM84,168a12,12,0,1,1,12-12A12,12,0,0,1,84,168Zm0-56a12,12,0,1,1,12-12A12,12,0,0,1,84,112Zm44-24a12,12,0,1,1,12-12A12,12,0,0,1,128,88Zm44,24a12,12,0,1,1,12-12A12,12,0,0,1,172,112Z"></path></svg>
        ),
        title: "Brand Customization",
        description:
          "Tailor your chatbot's appearance with your logo, colors, and branding for a consistent customer experience.",
      },
    ],
  },
  {
    id: "chat",
    label: "Chat Interactions",
    description:
      "Deliver seamless, intelligent conversations across every channel your customers already use.",
    features: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z"></path></svg>
        ),
        title: "Collect Feedback",
        description:
          "Let users rate and flag answers in real time so you can continuously improve accuracy.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM160,152H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
        ),
        title: "Cited Sources",
        description:
          "Every answer links back to the source document or URL, building trust and enabling quick verification.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M95.89,48a32,32,0,1,1,32,32A32,32,0,0,1,95.89,48Zm132.23,73.14C226.4,120.11,185.55,96,128,96S29.6,120.11,27.88,121.14a8,8,0,0,0,8.24,13.72c.36-.22,34.91-20.6,83.88-22.68V149L58,218.69a8,8,0,1,0,12,10.62L128,164l58,65.27a8,8,0,0,0,12-10.62L136,149V112.19c48.77,2.08,83.53,22.46,83.88,22.67a8,8,0,1,0,8.24-13.72Z"></path></svg>
        ),
        title: "Escalation to WhatsApp",
        description:
          "Seamlessly hand off complex queries to a live agent directly within WhatsApp without losing context.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M160,129.89,175.06,160H144.94l6.36-12.7v0ZM224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM207.16,188.42l-40-80a8,8,0,0,0-14.32,0L139.66,134.8a62.31,62.31,0,0,1-23.61-10A79.61,79.61,0,0,0,135.6,80H152a8,8,0,0,0,0-16H112V56a8,8,0,0,0-16,0v8H56a8,8,0,0,0,0,16h63.48a63.73,63.73,0,0,1-15.3,34.05,65.93,65.93,0,0,1-9-13.61,8,8,0,0,0-14.32,7.12,81.75,81.75,0,0,0,11.4,17.15A63.62,63.62,0,0,1,56,136a8,8,0,0,0,0,16,79.56,79.56,0,0,0,48.11-16.13,78.33,78.33,0,0,0,28.18,13.66l-19.45,38.89a8,8,0,0,0,14.32,7.16L136.94,176h46.12l9.78,19.58a8,8,0,1,0,14.32-7.16Z"></path></svg>
        ),
        title: "Language Support",
        description:
          "Automatically detect and respond in 100+ global languages so no customer is left behind.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M207,50.25A87.46,87.46,0,0,0,144.6,24h-.33A87.48,87.48,0,0,0,82,49.81L20.61,112a16,16,0,0,0,.06,22.56l28.66,28.66a15.92,15.92,0,0,0,11.32,4.69h.09a16,16,0,0,0,11.36-4.82L133,100.69a16.08,16.08,0,0,1,22.41-.21,15.6,15.6,0,0,1,4.73,11.19,16.89,16.89,0,0,1-4.85,12L93,183.88a16,16,0,0,0-.17,22.79l28.66,28.66a16.06,16.06,0,0,0,22.52.12L205.81,175C240.26,140.5,240.79,84.56,207,50.25ZM60.65,151.89,32,123.24,61.42,93.43,89.9,121.91ZM132.79,224l-28.68-28.65,30.13-29.13,28.49,28.48Z"></path></svg>
        ),
        title: "Lead Collection",
        description:
          "Capture names, emails, and custom fields mid-conversation and push them straight to your CRM.",
      },
    ],
  },
  {
    id: "extensions",
    label: "Extensions",
    description:
      "Extend ContextGPT's reach with powerful add-ons that go beyond basic Q&A.",
    features: [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M220,169.09l-92,53.65L36,169.09A8,8,0,0,0,28,182.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,169.09Z"></path><path d="M220,121.09l-92,53.65L36,121.09A8,8,0,0,0,28,134.91l96,56a8,8,0,0,0,8.06,0l96-56A8,8,0,1,0,220,121.09Z"></path><path d="M28,86.91l96,56a8,8,0,0,0,8.06,0l96-56a8,8,0,0,0,0-13.82l-96-56a8,8,0,0,0-8.06,0l-96,56a8,8,0,0,0,0,13.82Z"></path></svg>
        ),
        title: "API",
        description:
          "Programmatically query your bot, manage training data, and retrieve analytics via our REST API.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path></svg>
        ),
        title: "The AI Connector",
        description:
          "Bridge ContextGPT with any third-party service — CRMs, ticketing systems, e-commerce platforms, and more.",
      },
      {
        icon: (
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M149.66,149.66,131.31,168l18.35,18.34a8,8,0,0,1-11.32,11.32L132,191.31l-23.31,23.32a32.06,32.06,0,0,1-45.26,0l-5.37-5.38-28.4,28.41a8,8,0,0,1-11.32-11.32l28.41-28.4-5.38-5.37a32,32,0,0,1,0-45.26L64.69,124l-6.35-6.34a8,8,0,0,1,11.32-11.32L88,124.69l18.34-18.35a8,8,0,0,1,11.32,11.32L99.31,136,120,156.69l18.34-18.35a8,8,0,0,1,11.32,11.32Zm88-131.32a8,8,0,0,0-11.32,0l-28.4,28.41-5.37-5.38a32.05,32.05,0,0,0-45.26,0L124,64.69l-6.34-6.35a8,8,0,0,0-11.32,11.32l80,80a8,8,0,0,0,11.32-11.32L191.31,132l23.32-23.31a32,32,0,0,0,0-45.26l-5.38-5.37,28.41-28.4A8,8,0,0,0,237.66,18.34Z"></path></svg>
        ),
        title: "Automation",
        description:
          "Trigger workflows, send notifications, or update records automatically based on conversation events.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M229.89,72.25v0l0,0a15.93,15.93,0,0,0-6.18-6.06L135.68,18a15.94,15.94,0,0,0-15.36,0l-88,48.18a15.93,15.93,0,0,0-6.18,6.06l0,0v0A16,16,0,0,0,24,80.18v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,229.89,72.25ZM120,219.61,88,202.09V152a8,8,0,0,0-4.16-7L40,121v-32l80,43.8Zm8-100.73L48.66,75.44,83.14,56.57l41,22.45a8,8,0,0,0,7.68,0l41-22.45,34.48,18.87Zm88,2.1-43.84,24a8,8,0,0,0-4.16,7v50.09l-32,17.52V132.74l80-43.8Z"></path></svg>
        ),
        title: "Integrations",
        description:
          "Native plug-ins for Slack, Intercom, HubSpot, Zendesk, and dozens of other platforms — no code required.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Compliance",
    description:
      "Enterprise-grade security and compliance so your data stays protected and your team stays audit-ready.",
    features: [
      // {
      //   icon: (
      //     <svg></svg>
      //   ),
      //   title: "SOC 2 Report",
      //   description:
      //     "Independent SOC 2 Type II certification confirms our security controls meet the highest industry standards.",
      // },
      // {
      //   icon: (
      //     <svg></svg>
      //   ),
      //   title: "GDPR Compliance",
      //   description:
      //     "Full data residency controls, consent management, and DPA agreements to keep you compliant in Europe.",
      // },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path></svg>
        ),
        title: "RBAC Applied",
        description:
          "Role-based permissions, SSO, and audit logs give you granular control over who sees what.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,88v16H40V88Zm0,112H40V120H184v80Zm32-32H200V88a16,16,0,0,0-16-16H72V56H216Z"></path></svg>
        ),
        title: "Data Subprocessors",
        description:
          "Full transparency on every third-party vendor we use to process your data, updated in real time.",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-72,78.63V184a8,8,0,0,1-16,0V158.63a24,24,0,1,1,16,0ZM160,80H96V56a32,32,0,0,1,64,0Z"></path></svg>
        ),
        title: "Data Encryption",
        description:
          "All data encrypted in transit with TLS 1.2+ and at rest",
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#155ded" viewBox="0 0 256 256"><path d="M254.3,107.91,228.78,56.85a16,16,0,0,0-21.47-7.15L182.44,62.13,130.05,48.27a8.14,8.14,0,0,0-4.1,0L73.56,62.13,48.69,49.7a16,16,0,0,0-21.47,7.15L1.7,107.9a16,16,0,0,0,7.15,21.47l27,13.51,55.49,39.63a8.06,8.06,0,0,0,2.71,1.25l64,16a8,8,0,0,0,7.6-2.1l55.07-55.08,26.42-13.21a16,16,0,0,0,7.15-21.46Zm-54.89,33.37L165,113.72a8,8,0,0,0-10.68.61C136.51,132.27,116.66,130,104,122L147.24,80h31.81l27.21,54.41ZM41.53,64,62,74.22,36.43,125.27,16,115.06Zm116,119.13L99.42,168.61l-49.2-35.14,28-56L128,64.28l9.8,2.59-45,43.68-.08.09a16,16,0,0,0,2.72,24.81c20.56,13.13,45.37,11,64.91-5L188,152.66Zm62-57.87-25.52-51L214.47,64,240,115.06Zm-87.75,92.67a8,8,0,0,1-7.75,6.06,8.13,8.13,0,0,1-1.95-.24L80.41,213.33a7.89,7.89,0,0,1-2.71-1.25L51.35,193.26a8,8,0,0,1,9.3-13l25.11,17.94L126,208.24A8,8,0,0,1,131.82,217.94Z"></path></svg>
        ),
        title: "Data Processing Agreement",
        description:
          "Sign a legally binding DPA directly within the platform in minutes, no legal back-and-forth required.",
      },
    ],
  },
];
