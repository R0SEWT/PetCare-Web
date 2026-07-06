import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/DashboardLayout";
import { pets } from "@/lib/mock-data";
import { Plus, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/pets")({ component: PetsPage });

function PetsPage() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", species: "Perro", breed: "", age: "" });
  const [created, setCreated] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setCreated(form.name);
    setOpen(false);
    setForm({ name: "", species: "Perro", breed: "", age: "" });
    setTimeout(() => setCreated(null), 3500);
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold">Mis mascotas</h1>
          <p className="text-muted-foreground">Gestiona los perfiles de todos tus compañeros.</p>
        </div>
        <button onClick={() => setOpen(true)} className="px-5 py-3 rounded-full bg-brand text-brand-foreground font-bold inline-flex items-center gap-2 shadow-md shadow-brand/30">
          <Plus className="w-4 h-4" /> Agregar mascota
        </button>
      </div>

      {created && (
        <div className="mb-4 px-4 py-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold">
          ✓ {created} fue agregado a tus mascotas.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((p) => (
          <Link
            key={p.id}
            to="/dashboard/pets/$petId"
            params={{ petId: p.id }}
            className="bg-card border rounded-3xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition block"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal/40 to-brand/20 grid place-items-center text-3xl">{p.emoji}</div>
              <Badge level={p.urgency}>{p.urgencyLabel}</Badge>
            </div>
            <div className="font-extrabold text-lg">{p.name}</div>
            <div className="text-sm text-muted-foreground">{p.species} • {p.breed} • {p.age}</div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">{p.triages} triajes</span>
              <span className="text-xs font-bold text-brand inline-flex items-center gap-1">Ver historial <ArrowRight className="w-3 h-3" /></span>
            </div>
          </Link>
        ))}
        <button onClick={() => setOpen(true)} className="rounded-3xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center hover:border-brand hover:bg-brand/5 transition min-h-[180px]">
          <span className="w-12 h-12 rounded-2xl bg-brand/10 text-brand grid place-items-center mb-3"><Plus className="w-6 h-6" /></span>
          <span className="font-bold">Agregar mascota</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-card rounded-3xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold">Agregar mascota</h2>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-muted grid place-items-center"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Toby" className="mt-1 w-full px-4 py-2.5 rounded-full border-2 outline-none focus:border-brand text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Especie</label>
                <div className="mt-1 flex gap-2">
                  {["Perro", "Gato"].map((s) => (
                    <button type="button" key={s} onClick={() => setForm({ ...form, species: s })} className={`flex-1 px-4 py-2.5 rounded-full border-2 font-bold text-sm ${form.species === s ? "bg-brand text-brand-foreground border-brand" : "hover:border-brand"}`}>
                      {s === "Perro" ? "🐕" : "🐈"} {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Raza</label>
                <input required value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} placeholder="Ej. Labrador" className="mt-1 w-full px-4 py-2.5 rounded-full border-2 outline-none focus:border-brand text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Edad</label>
                <input required value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Ej. 2 años" className="mt-1 w-full px-4 py-2.5 rounded-full border-2 outline-none focus:border-brand text-sm" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 px-4 py-2.5 rounded-full border-2 font-bold text-sm hover:bg-muted">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
