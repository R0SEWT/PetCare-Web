import { createFileRoute } from "@tanstack/react-router";
import { Badge, Disclaimer } from "@/components/DashboardLayout";
import { pets, modelMetrics, recommendations } from "@/lib/mock-data";
import { Check, X, UploadCloud, MapPin, Save, Sparkles, AlertTriangle, Loader2, FileWarning, Clock, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/dashboard/new-analysis")({
  component: NewAnalysis,
});

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

type AnalysisStatus = "idle" | "analyzing" | "done" | "ood" | "timeout";

function NewAnalysis() {
  const [step, setStep] = useState(1);
  const [selectedPet, setSelectedPet] = useState(pets[0].id);
  const [fileError, setFileError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  function handleFile(file: File | undefined) {
    setFileError(null);
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("Formato inválido. Solo se permiten archivos JPG o PNG.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setFileError(`El archivo supera el límite de ${MAX_SIZE_MB}MB.`);
      return;
    }
    setFileName(file.name);
    setStep(3);
    runAnalysis();
  }

  function runAnalysis() {
    setStatus("analyzing");
    setProgress(0);
    if (timerRef.current) window.clearInterval(timerRef.current);
    const start = Date.now();
    // ~8% chance of simulated backend timeout (>5s) per USC-02 escenario 2
    const willTimeout = Math.random() < 0.08;
    const total = willTimeout ? 6200 : 2800 + Math.random() * 1200;
    timerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, (elapsed / total) * 100);
      setProgress(p);
      if (willTimeout && elapsed >= 5000) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        setStatus("timeout");
        return;
      }
      if (p >= 100) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        setStatus(Math.random() < 0.15 ? "ood" : "done");
      }
    }, 60);
  }

  const pet = pets.find(p => p.id === selectedPet)!;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">Nuevo análisis</h1>
      <p className="text-muted-foreground mb-8">A pocos clics de un triaje fresco.</p>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 max-w-xl">
        {["Mascota", "Foto", "Resultado"].map((label, i) => {
          const n = i + 1;
          const active = n <= step;
          return (
            <div key={label} className="flex items-center gap-2 flex-1">
              <button onClick={() => setStep(n)} className={`shrink-0 w-9 h-9 rounded-full grid place-items-center text-sm font-extrabold ${active ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"}`}>{n}</button>
              <span className={`text-sm font-bold ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
              {i < 2 && <div className={`flex-1 h-1 rounded-full ${n < step ? "bg-brand" : "bg-muted"}`} />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        <div className="space-y-6">
          {/* Pet chips */}
          <section className="bg-card border rounded-3xl p-6">
            <h2 className="font-extrabold mb-3">1. Elige una mascota</h2>
            <div className="flex flex-wrap gap-2">
              {pets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPet(p.id); setStep(Math.max(step, 2)); }}
                  className={`px-4 py-2 rounded-full border-2 font-bold text-sm inline-flex items-center gap-2 transition ${
                    selectedPet === p.id ? "bg-brand text-brand-foreground border-brand" : "hover:border-brand"
                  }`}
                >
                  <span>{p.emoji}</span> {p.name}
                </button>
              ))}
            </div>
          </section>

          {/* Photo guide */}
          <section className="bg-card border rounded-3xl p-6">
            <h2 className="font-extrabold mb-4">2. Guía de fotografía</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-extrabold text-green-700 uppercase mb-2">Hacer</div>
                <ul className="space-y-2">
                  {["Buena iluminación natural", "Acercamiento al área afectada", "Enfoque nítido"].map(t => (
                    <li key={t} className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-xl text-sm font-semibold">
                      <Check className="w-4 h-4" strokeWidth={3} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-extrabold text-red-700 uppercase mb-2">Evitar</div>
                <ul className="space-y-2">
                  {["Fotos borrosas", "Flash directo sobre la piel", "Filtros pesados"].map(t => (
                    <li key={t} className="flex items-center gap-2 bg-red-50 text-red-800 px-3 py-2 rounded-xl text-sm font-semibold">
                      <X className="w-4 h-4" strokeWidth={3} /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Upload */}
          <section className="bg-card border rounded-3xl p-6">
            <h2 className="font-extrabold mb-3">3. Sube la foto</h2>
            <label className="block border-2 border-dashed border-border rounded-3xl p-10 text-center hover:border-brand hover:bg-brand/5 cursor-pointer transition">
              <UploadCloud className="w-10 h-10 text-brand mx-auto mb-3" />
              <div className="font-bold">Arrastra y suelta o haz clic para subir</div>
              <div className="text-sm text-muted-foreground mt-1">Solo PNG o JPG, máximo {MAX_SIZE_MB}MB</div>
              {fileName && !fileError && (
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-brand bg-brand/10 px-3 py-1.5 rounded-full">
                  <Check className="w-3 h-3" /> {fileName}
                </div>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </label>
            {fileError && (
              <div className="mt-3 flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-2xl text-sm font-semibold">
                <FileWarning className="w-4 h-4" /> {fileError}
              </div>
            )}
          </section>
        </div>

        {/* Result panel */}
        <aside className="bg-card border rounded-3xl p-6 h-fit lg:sticky lg:top-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand" /> Resultado</h2>
            {status === "done" && <Badge level="warning">Consultar pronto</Badge>}
            {status === "ood" && <Badge level="info">Validación pendiente</Badge>}
            {status === "timeout" && <Badge level="danger">Tiempo agotado</Badge>}
          </div>

          <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 grid place-items-center text-6xl">
            {pet.emoji}
          </div>

          {status === "idle" && (
            <div className="text-center py-6 text-sm text-muted-foreground">
              Sube una foto para iniciar el análisis con <span className="font-bold text-foreground">{modelMetrics.version}</span>.
            </div>
          )}

          {status === "analyzing" && (
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Loader2 className="w-4 h-4 text-brand animate-spin" />
                Analizando con YOLOv8…
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="text-xs text-muted-foreground font-semibold">
                {progress < 30 && "Preprocesando imagen…"}
                {progress >= 30 && progress < 70 && "Detectando lesiones cutáneas…"}
                {progress >= 70 && progress < 100 && "Clasificando condición…"}
                {progress >= 100 && "Listo"}
              </div>
            </div>
          )}

          {status === "ood" && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-2xl text-sm">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="font-extrabold">Imagen fuera de distribución</div>
                  <div className="text-xs mt-1">La confianza del modelo es baja. Vuelve a tomar la foto siguiendo la guía.</div>
                </div>
              </div>
              <button onClick={runAnalysis} className="w-full px-3 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm">
                Reintentar análisis
              </button>
            </div>
          )}

          {status === "timeout" && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-800 p-3 rounded-2xl text-sm">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <div className="font-extrabold">Tiempo de espera agotado</div>
                  <div className="text-xs mt-1">El análisis tomó más de 5 segundos. Verifica tu conexión e inténtalo nuevamente.</div>
                </div>
              </div>
              <button onClick={runAnalysis} className="w-full px-3 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm">
                Reintentar análisis
              </button>
            </div>
          )}

          {status === "done" && (
            <>
              <div>
                <div className="text-xs text-muted-foreground font-semibold">Condición detectada</div>
                <div className="text-lg font-extrabold">Dermatitis Alérgica por Contacto</div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-extrabold text-brand">87%</span>
                <span className="text-sm text-muted-foreground font-semibold">confianza</span>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Dermatitis Alérgica por Contacto", pct: 87, color: "bg-brand" },
                  { label: "Pioderma Bacteriana", pct: 6, color: "bg-teal" },
                  { label: "Dermatitis Atópica", pct: 4, color: "bg-muted-foreground/40" },
                  { label: "Infección Fúngica", pct: 2, color: "bg-muted-foreground/30" },
                  { label: "Dermatofitosis", pct: 1, color: "bg-muted-foreground/20" },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs font-semibold mb-1"><span className="truncate pr-2">{b.label}</span><span>{b.pct}%</span></div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Model metrics */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-muted/50 text-center">
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-foreground">Accuracy</div>
                  <div className="text-lg font-extrabold text-brand">{modelMetrics.accuracy}%</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider font-extrabold text-muted-foreground">Recall</div>
                  <div className="text-lg font-extrabold text-brand">{modelMetrics.recall}%</div>
                </div>
              </div>

              {/* Preventive recommendations (USC-03) */}
              <div className="p-4 rounded-2xl bg-teal/10 border border-teal/30">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-teal-700" />
                  <div className="text-xs font-extrabold uppercase tracking-wider text-teal-700">Recomendaciones preventivas</div>
                </div>
                <ul className="space-y-1.5">
                  {(recommendations["Dermatitis Alérgica por Contacto"] || []).map((r) => (
                    <li key={r} className="text-xs text-foreground flex gap-2">
                      <span className="text-teal-700 font-extrabold">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2.5 rounded-full bg-brand text-brand-foreground font-bold text-sm inline-flex items-center justify-center gap-1.5">
                  <MapPin className="w-4 h-4" /> Buscar vet
                </button>
                <button className="px-3 py-2.5 rounded-full border-2 font-bold text-sm inline-flex items-center justify-center gap-1.5 hover:bg-muted">
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </>
          )}

          <Disclaimer />
        </aside>
      </div>
    </div>
  );
}
