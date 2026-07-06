import { createFileRoute } from "@tanstack/react-router";
import { adminUsers, modelMetrics } from "@/lib/mock-data";
import { Search, ShieldCheck, Users, Activity, PawPrint } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/admin")({ component: AdminPage });

function AdminPage() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      adminUsers.filter(
        (u) =>
          (!query ||
            u.name.toLowerCase().includes(query.toLowerCase()) ||
            u.email.toLowerCase().includes(query.toLowerCase())) &&
          (!role || u.role === role),
      ),
    [query, role],
  );

  const totals = {
    users: adminUsers.length,
    pets: adminUsers.reduce((a, u) => a + u.pets, 0),
    triages: adminUsers.reduce((a, u) => a + u.triages, 0),
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal/20 text-teal-700 text-[10px] font-extrabold uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3" /> Vista de Administrador
        </span>
      </div>
      <h1 className="text-3xl font-extrabold mb-1">Panel de Administración</h1>
      <p className="text-muted-foreground mb-6">Gestiona usuarios y supervisa la plataforma PetCare.</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Usuarios", value: totals.users, icon: Users },
          { label: "Mascotas registradas", value: totals.pets, icon: PawPrint },
          { label: "Triajes totales", value: totals.triages, icon: Activity },
        ].map((c) => (
          <div key={c.label} className="bg-card border rounded-3xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand grid place-items-center">
              <c.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{c.label}</div>
              <div className="text-2xl font-extrabold">{c.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border rounded-3xl p-5 mb-6">
        <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3">Estado del modelo</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          {[
            { l: "Versión", v: modelMetrics.version },
            { l: "Accuracy", v: `${modelMetrics.accuracy}%` },
            { l: "Recall", v: `${modelMetrics.recall}%` },
            { l: "FN Rate", v: `${modelMetrics.falseNegativeRate}%` },
          ].map((m) => (
            <div key={m.l} className="p-3 rounded-2xl bg-muted/50">
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-foreground">{m.l}</div>
              <div className="font-extrabold text-brand">{m.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 bg-card border rounded-full px-4 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o correo…"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {["Dueño", "Veterinario", "Admin"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(role === r ? null : r)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${
              role === r ? "bg-brand text-brand-foreground border-brand" : "hover:border-brand"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.5fr_1fr_80px_80px_120px_100px] gap-4 px-5 py-3 text-[10px] uppercase tracking-wider font-extrabold text-muted-foreground border-b bg-muted/30">
          <div>Usuario</div>
          <div>Rol</div>
          <div className="text-center">Mascotas</div>
          <div className="text-center">Triajes</div>
          <div>Registro</div>
          <div className="text-center">Estado</div>
        </div>
        <div className="divide-y">
          {filtered.map((u) => (
            <div key={u.id} className="md:grid md:grid-cols-[1.5fr_1fr_80px_80px_120px_100px] gap-4 px-5 py-4 items-center hover:bg-muted/30 transition">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-teal grid place-items-center text-white font-bold text-sm">
                  {u.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-bold truncate">{u.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                </div>
              </div>
              <div className="text-sm font-semibold mt-2 md:mt-0">{u.role}</div>
              <div className="text-sm font-bold text-center">{u.pets}</div>
              <div className="text-sm font-bold text-center">{u.triages}</div>
              <div className="text-xs text-muted-foreground font-semibold">{u.joined}</div>
              <div className="text-center mt-2 md:mt-0">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                    u.status === "Activo" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Activo" ? "bg-green-500" : "bg-muted-foreground"}`} />
                  {u.status}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">Sin resultados.</div>}
        </div>
      </div>
    </div>
  );
}
