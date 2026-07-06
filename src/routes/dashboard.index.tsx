import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/DashboardLayout";
import { PawPrint, Activity, Clock, HeartPulse, Plus, ArrowRight } from "lucide-react";
import { pets, triages } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function StatCard({ icon: Icon, label, value, hint, tone }: any) {
  return (
    <div className="bg-card border rounded-3xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className={`grid place-items-center w-10 h-10 rounded-2xl ${tone}`}><Icon className="w-5 h-5" /></span>
        <span className="text-xs font-bold text-muted-foreground">{hint}</span>
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm text-muted-foreground font-semibold">{label}</div>
    </div>
  );
}

function DashboardHome() {
  const recent = triages.slice(0, 4);
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Hola, María 👋</h1>
          <p className="text-muted-foreground">Así está tu manada hoy.</p>
        </div>
        <Link to="/dashboard/new-analysis" className="px-5 py-3 rounded-full bg-brand text-brand-foreground font-bold inline-flex items-center gap-2 shadow-md shadow-brand/30">
          <Plus className="w-4 h-4" /> Nuevo análisis
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={PawPrint} label="Mascotas registradas" value="4" hint="Todo listo" tone="bg-brand/10 text-brand" />
        <StatCard icon={Activity} label="Triajes totales" value="16" hint="+3 esta semana" tone="bg-teal/40 text-foreground" />
        <StatCard icon={Clock} label="Último análisis" value="hace 2d" hint="Milo • oreja" tone="bg-orange-100 text-orange-600" />
        <StatCard icon={HeartPulse} label="Estado general" value="Bueno" hint="1 a monitorear" tone="bg-green-100 text-green-600" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold">Tus mascotas</h2>
        <Link to="/dashboard/pets" className="text-sm font-bold text-brand hover:underline">Ver todas</Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {pets.map((p) => (
          <div key={p.id} className="bg-card border rounded-3xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition">
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/40 to-brand/20 grid place-items-center text-3xl">{p.emoji}</div>
              <Badge level={p.urgency}>{p.urgencyLabel}</Badge>
            </div>
            <div className="font-extrabold text-lg">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.species} • {p.breed} • {p.age}</div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">{p.triages} triajes</span>
              <Link to="/dashboard/new-analysis" className="text-xs font-bold text-brand hover:underline inline-flex items-center gap-1">Analizar <ArrowRight className="w-3 h-3" /></Link>
            </div>
          </div>
        ))}

        <button className="rounded-3xl border-2 border-dashed border-border bg-transparent flex flex-col items-center justify-center p-8 text-center hover:border-brand hover:bg-brand/5 transition min-h-[180px]">
          <span className="w-12 h-12 rounded-2xl bg-brand/10 text-brand grid place-items-center mb-3"><Plus className="w-6 h-6" /></span>
          <span className="font-bold">Agregar mascota</span>
          <span className="text-xs text-muted-foreground mt-1">Registra un nuevo compañero</span>
        </button>
      </div>

      <div className="bg-card border rounded-3xl">
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-xl font-extrabold">Triajes recientes</h2>
          <Link to="/dashboard/history" className="text-sm font-bold text-brand hover:underline">Ver historial</Link>
        </div>
        <ul className="divide-y">
          {recent.map((t) => (
            <li key={t.id} className="p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-muted grid place-items-center text-xl">{pets.find(p => p.id === t.petId)?.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{t.condition}</div>
                <div className="text-sm text-muted-foreground">{t.pet} • {t.zone}</div>
              </div>
              <div className="hidden sm:block text-sm font-bold text-brand">{t.confidence}%</div>
              <Badge level={t.urgency}>{t.urgencyLabel}</Badge>
              <span className="text-xs text-muted-foreground font-semibold hidden md:inline">{t.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
