import { Link } from "@tanstack/react-router";
import logoUrl from "@/assets/logo-petcare.png";

export function Logo({ className = "", showTagline = true, size = "md", whiteBg = false }: { className?: string; showTagline?: boolean; size?: "sm" | "md" | "lg"; whiteBg?: boolean }) {
  const dims = size === "lg" ? "h-20" : size === "sm" ? "h-12" : "h-16";
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <span className={`inline-flex items-center justify-center ${whiteBg ? "bg-white rounded-2xl p-1.5 shadow-sm" : ""}`}>
        <img
          src={logoUrl}
          alt="PetCare por CapyGeeks"
          className={`${dims} w-auto object-contain select-none`}
          draggable={false}
        />
      </span>
      {showTagline && (
        <span className="hidden sm:inline text-[10px] font-extrabold text-muted-foreground tracking-[0.15em] uppercase border-l border-border pl-3 leading-tight">
          by<br />CapyGeeks
        </span>
      )}
    </Link>
  );
}
