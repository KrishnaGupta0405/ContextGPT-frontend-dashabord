import { Tag } from "lucide-react";

export default function PromoCodeButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
    >
      <Tag className="h-4 w-4" />
      Have a promo code?
    </button>
  );
}
