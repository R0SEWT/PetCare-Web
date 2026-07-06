import { createFileRoute } from "@tanstack/react-router";
import { modelMetrics } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/settings")({ component: SettingsPage });

function SettingsPage() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">Ajustes</h1>
      <p className="text-muted-foreground mb-8">Preferencias y notificaciones.</p>
      <div className="bg-card border rounded-3xl divide-y mb-8">
        {[
          { t: "Notificaciones por correo", d: "Recibe un resumen de cada triaje." },
          { t: "Recordatorios", d: "Recordatorio semanal de revisión de piel para tus mascotas." },
          { t: "Compartir datos anónimos", d: "Ayuda a mejorar el modelo de IA." },
          { t: "Modo oscuro", d: "Más cómodo para los ojos por la noche." },
        ].map((s, i) => (
          <div key={s.t} className="p-5 flex items-center justify-between">
            <div>
              <div className="font-bold">{s.t}</div>
              <div className="text-sm text-muted-foreground">{s.d}</div>
            </div>
            <button className={`w-12 h-7 rounded-full relative transition ${i % 2 === 0 ? "bg-brand" : "bg-muted"}`}>
              <span className={`absolute top-1 ${i % 2 === 0 ? "right-1" : "left-1"} w-5 h-5 rounded-full bg-white shadow`} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-card border rounded-3xl p-6">
        <h2 className="font-extrabold mb-1">Acerca del modelo</h2>
        <p className="text-sm text-muted-foreground mb-4">Métricas de la versión actual en producción.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {[
            { l: "Accuracy", v: `${modelMetrics.accuracy}%` },
            { l: "Recall", v: `${modelMetrics.recall}%` },
            { l: "Precisión", v: `${modelMetrics.precision}%` },
            { l: "Falsos neg.", v: `${modelMetrics.falseNegativeRate}%` },
          ].map(m => (
            <div key={m.l} className="bg-muted/50 rounded-2xl p-3 text-center">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{m.l}</div>
              <div className="text-2xl font-extrabold text-brand">{m.v}</div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Modelo: <span className="font-bold text-foreground">{modelMetrics.version}</span> · Arquitectura YOLOv8 entrenada con dataset de dermatología veterinaria. Cubre 5 condiciones: dermatitis atópica, dermatofitosis, dermatitis alérgica por contacto, infección fúngica y pioderma bacteriana.
        </div>
      </div>
    </div>
  );
}
