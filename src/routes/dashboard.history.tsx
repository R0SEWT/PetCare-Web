import { createFileRoute } from "@tanstack/react-router";
import { Badge, Disclaimer } from "@/components/DashboardLayout";
import { triages, pets } from "@/lib/mock-data";
import { readStoredTriages, type StoredTriage } from "@/lib/triage-records";
import { Search, MapPin, Save, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/dashboard/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const [query, setQuery] = useState("");
  const [petFilter, setPetFilter] = useState<string | null>(null);
  const [urgFilter, setUrgFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>("t3");
  const [storedTriages, setStoredTriages] = useState<StoredTriage[]>([]);

  useEffect(() => {
    setStoredTriages(readStoredTriages());
  }, []);

  const allTriages = useMemo(() => [...storedTriages, ...triages], [storedTriages]);

  const filtered = useMemo(
    () =>
      allTriages.filter(
        (t) =>
          (!query ||
            t.condition.toLowerCase().includes(query.toLowerCase()) ||
            t.pet.toLowerCase().includes(query.toLowerCase())) &&
          (!petFilter || t.pet === petFilter) &&
          (!urgFilter || t.urgency === urgFilter),
      ),
    [allTriages, query, petFilter, urgFilter],
  );

  const grouped = useMemo(() => {
    const map: Record<string, typeof allTriages> = {};
    filtered.forEach((t) => {
      (map[t.month] ||= []).push(t);
    });
    return map;
  }, [filtered]);

  const selected = allTriages.find((t) => t.id === selectedId) || allTriages[0];
  const selectedPet = selected ? pets.find((p) => p.id === selected.petId) : null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">Historial</h1>
      <p className="text-muted-foreground mb-6">Todos tus triajes pasados en un solo lugar.</p>

      <div className="flex items-center gap-2 mb-4 bg-card border rounded-full px-4 py-2.5">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por condición o mascota…"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-xs font-bold text-muted-foreground self-center mr-1">Mascotas:</span>
        {pets.map((p) => (
          <button
            key={p.id}
            onClick={() => setPetFilter(petFilter === p.name ? null : p.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${petFilter === p.name ? "bg-brand text-brand-foreground border-brand" : "hover:border-brand"}`}
          >
            {p.emoji} {p.name}
          </button>
        ))}
        <span className="text-xs font-bold text-muted-foreground self-center ml-3 mr-1">
          Urgencia:
        </span>
        {[
          { v: "success", l: "Sin urgencia" },
          { v: "warning", l: "Consultar pronto" },
          { v: "danger", l: "Alta" },
          { v: "info", l: "Seguimiento" },
        ].map((u) => (
          <button
            key={u.v}
            onClick={() => setUrgFilter(urgFilter === u.v ? null : u.v)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${urgFilter === u.v ? "bg-foreground text-background border-foreground" : "hover:border-foreground"}`}
          >
            {u.l}
          </button>
        ))}
        {(petFilter || urgFilter || query) && (
          <button
            onClick={() => {
              setPetFilter(null);
              setUrgFilter(null);
              setQuery("");
            }}
            className="px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" /> Limpiar
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-6">
          {Object.entries(grouped).map(([month, items]) => (
            <section key={month}>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-2">
                {month}
              </h3>
              <div className="bg-card border rounded-3xl divide-y overflow-hidden">
                {items.map((t) => {
                  const pet = pets.find((p) => p.id === t.petId);
                  const active = t.id === selectedId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`w-full text-left p-4 flex items-center gap-4 transition ${active ? "bg-brand/5" : "hover:bg-muted/40"}`}
                    >
                      <div className="w-11 h-11 rounded-2xl bg-muted grid place-items-center text-xl shrink-0">
                        {pet?.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">{t.condition}</div>
                        <div className="text-xs text-muted-foreground">
                          {t.pet} • {t.zone}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-brand hidden sm:block">
                        {t.confidence}%
                      </div>
                      <Badge level={t.urgency}>{t.urgencyLabel}</Badge>
                      <span className="text-xs text-muted-foreground font-semibold hidden md:inline w-12 text-right">
                        {t.date}
                      </span>
                    </button>
                  );
                })}
                {items.length === 0 && (
                  <div className="p-6 text-sm text-muted-foreground text-center">
                    Ningún triaje coincide con tus filtros.
                  </div>
                )}
              </div>
            </section>
          ))}
          {Object.keys(grouped).length === 0 && (
            <div className="bg-card border rounded-3xl p-10 text-center text-muted-foreground">
              Sin resultados.
            </div>
          )}
        </div>

        {/* Detail panel */}
        <aside className="bg-card border rounded-3xl p-6 h-fit sticky top-6 space-y-5">
          {selected && selectedPet ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="font-extrabold">Detalle del triaje</h2>
                <Badge level={selected.urgency}>{selected.urgencyLabel}</Badge>
              </div>
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 grid place-items-center text-6xl">
                {selectedPet.emoji}
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50">
                <div className="w-11 h-11 rounded-xl bg-card grid place-items-center text-xl">
                  {selectedPet.emoji}
                </div>
                <div>
                  <div className="font-bold">{selectedPet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {selectedPet.species} • {selectedPet.breed} • {selectedPet.age}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground font-semibold">
                  Condición detectada
                </div>
                <div className="text-lg font-extrabold">{selected.condition}</div>
                <div className="text-sm text-muted-foreground">
                  Zona: {selected.zone} • {selected.date}
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-brand">{selected.confidence}%</span>
                <span className="text-sm text-muted-foreground font-semibold">confianza</span>
              </div>

              <div className="space-y-2">
                {[
                  { label: selected.condition, pct: selected.confidence, color: "bg-brand" },
                  {
                    label: "Coincidencia secundaria",
                    pct: Math.max(5, 100 - selected.confidence - 4),
                    color: "bg-teal",
                  },
                  { label: "Coincidencia terciaria", pct: 4, color: "bg-muted-foreground/40" },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="truncate pr-2">{b.label}</span>
                      <span>{b.pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${b.color} rounded-full`}
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm inline-flex items-center justify-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Buscar vet
                </button>
                <button className="px-3 py-2.5 rounded-full border-2 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-muted">
                  <Save className="w-4 h-4" /> Re-guardar
                </button>
              </div>
              <Disclaimer />
            </>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-10">
              Selecciona un triaje para ver detalles.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
