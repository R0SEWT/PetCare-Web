import { Link, useRouterState } from "@tanstack/react-router";
import { Home, PawPrint, ScanLine, History, User, Settings, LogOut, ShieldCheck } from "lucide-react";
import { Logo } from "./Logo";

const items = [
  { to: "/dashboard", label: "Inicio", icon: Home },
  { to: "/dashboard/pets", label: "Mis Mascotas", icon: PawPrint },
  { to: "/dashboard/new-analysis", label: "Nuevo Análisis", icon: ScanLine },
  { to: "/dashboard/history", label: "Historial", icon: History },
  { to: "/dashboard/profile", label: "Perfil", icon: User },
  { to: "/dashboard/settings", label: "Ajustes", icon: Settings },
  { to: "/dashboard/admin", label: "Admin", icon: ShieldCheck, badge: "Admin" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="w-64 hidden md:flex flex-col bg-card border-r p-4 sticky top-0 h-screen">
        <div className="px-2 mb-6"><Logo /></div>
        <nav className="flex flex-col gap-1 flex-1">
          {items.map(({ to, label, icon: Icon, badge }) => {
            const active = pathname === to || (to !== "/dashboard" && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                  active ? "bg-brand text-brand-foreground shadow-md shadow-brand/20" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full tracking-wider ${active ? "bg-white/25 text-white" : "bg-teal/20 text-teal-700"}`}>{badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t pt-3 mt-3 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-teal grid place-items-center text-white font-bold">M</div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm truncate">María López</div>
            <div className="text-xs text-muted-foreground truncate">maria@example.com</div>
          </div>
          <Link to="/login" className="text-muted-foreground hover:text-foreground" aria-label="Cerrar sesión"><LogOut className="w-4 h-4" /></Link>
        </div>
        <div className="text-[10px] text-center text-muted-foreground font-bold mt-3 tracking-wider">
          © 2026 CAPYGEEKS
        </div>
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export function Badge({ level, children }: { level: "success" | "warning" | "danger" | "info"; children: React.ReactNode }) {
  const map = {
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    danger: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${map[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        level === "success" ? "bg-green-500" : level === "warning" ? "bg-orange-500" : level === "danger" ? "bg-red-500" : "bg-blue-500"
      }`} />
      {children}
    </span>
  );
}

export function Disclaimer() {
  return (
    <p className="text-xs text-muted-foreground bg-muted/60 border border-border rounded-xl p-3 leading-relaxed">
      ⚠️ Este es solo un triaje preventivo. PetCare no emite diagnósticos médicos ni prescripciones.
    </p>
  );
}