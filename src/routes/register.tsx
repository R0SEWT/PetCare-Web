import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Crear cuenta — PetCare" }] }),
  component: RegisterPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
  );
}

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function RegisterPage() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const s = strength(pwd);
  const labels = ["Muy débil", "Débil", "Aceptable", "Fuerte", "Excelente"];
  const colors = ["bg-muted", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"];

  return (
    <div className="min-h-screen grid md:grid-cols-[1.1fr_1fr] bg-background">
      <div className="flex flex-col justify-center p-8 md:p-16">
        <div className="mb-8"><Logo /></div>
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-extrabold">Crea tu cuenta</h1>
          <p className="mt-2 text-muted-foreground">Empieza a proteger la piel de tu mascota hoy.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }} className="mt-8 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field icon={User} label="Nombre" placeholder="María" />
              <Field icon={User} label="Apellido" placeholder="López" />
            </div>
            <Field icon={Mail} label="Correo electrónico" type="email" placeholder="tu@ejemplo.com" />
            <div>
              <Field icon={Lock} label="Contraseña" type="password" placeholder="••••••••" value={pwd} onChange={(e: any) => setPwd(e.target.value)} />
              <div className="mt-2 flex gap-1">
                {[0,1,2,3].map(i => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full ${i < s ? colors[s] : "bg-muted"}`} />
                ))}
              </div>
              <div className="mt-1 text-xs text-muted-foreground font-semibold">{pwd ? labels[s] : "Usa 8+ caracteres, un número y un símbolo"}</div>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-full bg-brand text-brand-foreground font-bold shadow-md shadow-brand/30 hover:opacity-90 inline-flex items-center justify-center gap-2">
              Crear cuenta <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6 text-center text-xs text-muted-foreground">
            <span className="bg-background px-3 relative z-10">O</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>
          <button className="w-full py-3 rounded-full border-2 font-bold inline-flex items-center justify-center gap-3 hover:bg-muted">
            <GoogleIcon /> Registrarse con Google
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-bold text-brand hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-brand to-blue-700 text-white relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-teal/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-md">
          <div className="text-6xl mb-6">🐶🐱</div>
          <h2 className="text-4xl font-extrabold leading-tight">Únete a miles de dueños de mascotas</h2>
          <p className="mt-4 text-white/80">Todo lo que obtienes al registrarte:</p>

          <ul className="mt-8 space-y-4">
            {[
              "Análisis de piel con IA en menos de 5 segundos",
              "Historial de triajes ilimitado por mascota",
              "Modelo YOLOv8 con 87% de accuracy y 92% de recall",
              "Perfiles para múltiples mascotas",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-teal text-teal-foreground shrink-0">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <span className="font-semibold">{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-xs text-white/60 font-bold tracking-wider">UN PRODUCTO DE CAPYGEEKS</div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, ...props }: any) {
  return (
    <label className="block">
      <span className="text-sm font-bold mb-1.5 block">{label}</span>
      <span className="flex items-center gap-2 px-4 py-3 rounded-full border-2 focus-within:border-brand transition bg-background">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <input {...props} className="flex-1 bg-transparent outline-none text-sm" />
      </span>
    </label>
  );
}
