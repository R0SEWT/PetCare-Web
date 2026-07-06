import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Eye, History, Zap, ShieldCheck, UserPlus, Camera, Sparkles, PawPrint, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PetCare — Triaje dermatológico con IA para mascotas, por CapyGeeks" },
      { name: "description", content: "Sube una foto y obtén un triaje preventivo de piel para tu perro o gato. IA con YOLOv8." },
    ],
  }),
  component: LandingPage,
});

function Nav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo size="sm" />
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <a href="#how" className="hover:text-foreground">Cómo funciona</a>
          <a href="#features" className="hover:text-foreground">Funciones</a>
          <a href="#about" className="hover:text-foreground">Acerca de</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login" className="px-4 py-2 rounded-full text-sm font-bold hover:bg-muted">Iniciar sesión</Link>
          <Link to="/register" className="px-5 py-2 rounded-full text-sm font-bold bg-brand text-brand-foreground shadow-md shadow-brand/30 hover:opacity-90">Registrarse</Link>
        </div>
      </div>
    </header>
  );
}

function ResultMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-brand/20 via-teal/30 to-transparent rounded-[2.5rem] blur-2xl" />
      <div className="relative bg-card rounded-3xl border shadow-2xl shadow-brand/10 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-bold"><Sparkles className="w-4 h-4 text-brand" /> Análisis IA</div>
          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-700 font-bold">Consultar pronto</span>
        </div>
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 mb-4 grid place-items-center text-6xl">🐕</div>
        <div className="mb-3">
          <div className="text-xs text-muted-foreground font-semibold">Condición detectada</div>
          <div className="text-xl font-extrabold">Dermatitis Alérgica por Contacto</div>
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-extrabold text-brand">87%</span>
          <span className="text-sm text-muted-foreground font-semibold">confianza</span>
        </div>
        <div className="space-y-2">
          {[
            { label: "Dermatitis Alérgica", pct: 87, color: "bg-brand" },
            { label: "Pioderma Bacteriana", pct: 6, color: "bg-teal" },
            { label: "Dermatitis Atópica", pct: 4, color: "bg-muted-foreground/50" },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex justify-between text-xs font-semibold mb-1"><span>{b.label}</span><span>{b.pct}%</span></div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-brand/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/30 text-foreground text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-brand" /> Con tecnología YOLOv8
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Detecta problemas de piel en tu mascota <span className="text-brand">antes</span> de que sean un problema.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              PetCare usa IA para analizar fotos de la piel de tu perro o gato y darte un triaje preventivo en menos de 5 segundos — para que sepas cuándo es momento de ir al veterinario.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="px-7 py-3.5 rounded-full bg-brand text-brand-foreground font-bold shadow-lg shadow-brand/30 hover:opacity-90 inline-flex items-center gap-2">
                Pruébalo gratis <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how" className="px-7 py-3.5 rounded-full border-2 border-foreground/10 font-bold hover:bg-muted">Cómo funciona</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> Sin tarjeta</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand" /> 5 triajes gratis</div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end"><ResultMockup /></div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold">Cómo funciona</h2>
            <p className="mt-3 text-muted-foreground">Tres pasos simples hacia una mascota más sana</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: 1, icon: PawPrint, title: "Registra a tu mascota", desc: "Agrega los datos básicos de tu perro o gato: nombre, raza, edad." },
              { n: 2, icon: Camera, title: "Sube una foto", desc: "Toma una foto clara del área afectada y súbela." },
              { n: 3, icon: Sparkles, title: "Obtén tu resultado", desc: "Recibe un triaje IA con nivel de urgencia en menos de 5 segundos." },
            ].map((s) => (
              <div key={s.n} className="bg-card rounded-3xl p-8 border relative">
                <div className="absolute -top-4 left-8 w-9 h-9 rounded-full bg-brand text-brand-foreground grid place-items-center font-extrabold shadow-md">{s.n}</div>
                <s.icon className="w-9 h-9 text-brand mt-2 mb-4" />
                <h3 className="text-xl font-extrabold mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-extrabold">¿Por qué PetCare?</h2>
            <p className="mt-3 text-muted-foreground">Construido con cariño (y mucha data de entrenamiento)</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Eye, title: "Visión IA", desc: "Modelo YOLOv8 con 87% accuracy y 92% recall." },
              { icon: History, title: "Historial de triajes", desc: "Rastrea cada análisis para ver la evolución." },
              { icon: Zap, title: "Resultados <5s", desc: "Análisis ultra rápido para actuar de inmediato." },
              { icon: ShieldCheck, title: "Solo preventivo", desc: "Te ayudamos a decidir cuándo ir al vet — nunca lo reemplazamos." },
            ].map((f) => (
              <div key={f.title} className="bg-card rounded-3xl p-6 border hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition">
                <div className="w-12 h-12 rounded-2xl bg-teal/40 grid place-items-center mb-4">
                  <f.icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-extrabold mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-brand text-brand-foreground rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-teal/40 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Dale a tu mascota el cuidado que merece.</h2>
              <p className="mt-2 text-white/80 max-w-2xl">Inicia tu primer triaje en menos de un minuto. Siempre gratis hasta 5 análisis al mes.</p>
            </div>
            <Link to="/register" className="px-8 py-4 rounded-full bg-white text-brand font-extrabold inline-flex items-center gap-2 justify-self-start md:justify-self-end shadow-lg">
              <UserPlus className="w-4 h-4" /> Crear cuenta gratis
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="border-t py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <Logo />
            <p className="mt-3 text-muted-foreground">Una startup de CapyGeeks. Triaje IA preventivo para las mascotas que amamos.</p>
          </div>
          <div>
            <div className="font-bold mb-3">Producto</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground">Funciones</a></li>
              <li><a href="#how" className="hover:text-foreground">Cómo funciona</a></li>
              <li><Link to="/register" className="hover:text-foreground">Precios</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Empresa</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Acerca de CapyGeeks</a></li>
              <li><a href="#" className="hover:text-foreground">Contacto</a></li>
              <li><a href="#" className="hover:text-foreground">Trabaja con nosotros</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-3">Legal</div>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Privacidad</a></li>
              <li><a href="#" className="hover:text-foreground">Términos</a></li>
              <li><a href="#" className="hover:text-foreground">Aviso médico</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t text-xs text-muted-foreground flex flex-wrap justify-between gap-3">
          <span>© 2026 CapyGeeks. Todos los derechos reservados.</span>
          <span>PetCare solo ofrece triaje preventivo. No es un diagnóstico médico.</span>
        </div>
      </footer>
    </div>
  );
}
