import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Mail, Lock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar sesión — PetCare" }] }),
  component: LoginPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background">
      <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-brand to-blue-600 text-white relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-teal/40 rounded-full blur-3xl" />
        <Logo className="text-white [&_span]:!text-white" showTagline={false} whiteBg />
        <div className="relative">
          <div className="text-7xl mb-6">🐾</div>
          <h2 className="text-4xl font-extrabold leading-tight">Bienvenido de vuelta.<br/>Tu mascota te extrañó.</h2>
          <p className="mt-4 text-white/80 max-w-md">Retoma donde lo dejaste — revisa triajes pasados o realiza uno nuevo en segundos.</p>
        </div>
        <div className="text-sm text-white/70 relative">© 2026 CapyGeeks</div>
      </div>

      <div className="flex flex-col justify-center p-8 md:p-16">
        <div className="md:hidden mb-8"><Logo /></div>
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-extrabold">Inicia sesión en PetCare</h1>
          <p className="mt-2 text-muted-foreground">Ingresa tus datos a continuación.</p>

          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/dashboard" }); }} className="mt-8 space-y-4">
            <Field icon={Mail} label="Correo electrónico" type="email" placeholder="tu@ejemplo.com" />
            <Field icon={Lock} label="Contraseña" type="password" placeholder="••••••••" />
            <div className="flex justify-end">
              <a href="#" className="text-sm font-bold text-brand hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <button type="submit" className="w-full py-3.5 rounded-full bg-brand text-brand-foreground font-bold shadow-md shadow-brand/30 hover:opacity-90 inline-flex items-center justify-center gap-2">
              Iniciar sesión <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="relative my-6 text-center text-xs text-muted-foreground">
            <span className="bg-background px-3 relative z-10">O</span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          </div>

          <button className="w-full py-3 rounded-full border-2 font-bold inline-flex items-center justify-center gap-3 hover:bg-muted">
            <GoogleIcon /> Continuar con Google
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            ¿Eres nuevo?{" "}
            <Link to="/register" className="font-bold text-brand hover:underline">Crear una cuenta</Link>
          </p>
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
