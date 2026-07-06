import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge, Disclaimer } from "@/components/DashboardLayout";
import { pets, triages } from "@/lib/mock-data";
import { ArrowLeft, ScanLine, Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/dashboard/pets/$petId")({ component: PetDetail });

function PetDetail() {
  const { petId } = Route.useParams();
  const pet = pets.find((p) => p.id === petId);
  const petTriages = triages.filter((t) => t.petId === petId);

  if (!pet) {
    return (
      <div className="p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-extrabold">Mascota no encontrada</h1>
        <Link to="/dashboard/pets" className="text-brand font-bold underline mt-3 inline-block">
          Volver a mis mascotas
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <Link
        to="/dashboard/pets"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Mis mascotas
      </Link>

      <div className="bg-card border rounded-3xl p-6 mb-6 flex flex-wrap items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal/40 to-brand/20 grid place-items-center text-5xl">
          {pet.emoji}
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-extrabold">{pet.name}</h1>
            <Badge level={pet.urgency}>{pet.urgencyLabel}</Badge>
          </div>
          <div className="text-muted-foreground mt-1">
            {pet.species} • {pet.breed} • {pet.age}
          </div>
          <div className="text-xs text-muted-foreground font-bold mt-1">{petTriages.length} triajes registrados</div>
        </div>
        <Link
          to="/dashboard/new-analysis"
          className="px-5 py-3 rounded-full bg-brand text-brand-foreground font-bold inline-flex items-center gap-2 shadow-md shadow-brand/30"
        >
          <ScanLine className="w-4 h-4" /> Nuevo análisis
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <section>
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mb-3">
            Historial clínico de {pet.name}
          </h2>
          {petTriages.length === 0 ? (
            <div className="bg-card border rounded-3xl p-10 text-center text-sm text-muted-foreground">
              {pet.name} aún no tiene triajes registrados.
            </div>
          ) : (
            <div className="bg-card border rounded-3xl divide-y overflow-hidden">
              {petTriages.map((t) => (
                <div key={t.id} className="p-4 flex items-center gap-4 hover:bg-muted/40">
                  <div className="w-11 h-11 rounded-2xl bg-muted grid place-items-center text-xs font-extrabold text-muted-foreground shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold truncate">{t.condition}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.zone} • {t.date} {t.month}
                    </div>
                  </div>
                  <div className="text-sm font-bold text-brand hidden sm:block">{t.confidence}%</div>
                  <Badge level={t.urgency}>{t.urgencyLabel}</Badge>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="bg-card border rounded-3xl p-5">
            <h3 className="font-extrabold mb-3">Acciones</h3>
            <div className="space-y-2">
              <Link
                to="/dashboard/new-analysis"
                className="w-full px-4 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm inline-flex items-center justify-center gap-2"
              >
                <ScanLine className="w-4 h-4" /> Iniciar análisis
              </Link>
              <button className="w-full px-4 py-2.5 rounded-full border-2 font-bold text-sm inline-flex items-center justify-center gap-2 hover:bg-muted">
                <MapPin className="w-4 h-4" /> Buscar veterinario
              </button>
            </div>
          </div>
          <Disclaimer />
        </aside>
      </div>
    </div>
  );
}
