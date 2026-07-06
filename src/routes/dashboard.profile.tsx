import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-1">Perfil</h1>
      <p className="text-muted-foreground mb-8">Gestiona tu información personal.</p>
      <div className="bg-card border rounded-3xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand to-teal grid place-items-center text-white font-extrabold text-2xl">M</div>
          <div>
            <div className="font-extrabold text-lg">María López</div>
            <div className="text-sm text-muted-foreground">maria@example.com</div>
            <button className="mt-2 text-xs font-bold text-brand hover:underline">Cambiar avatar</button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {["Nombre", "Apellido", "Correo electrónico", "Teléfono"].map((l, i) => (
            <label key={l} className="block">
              <span className="text-sm font-bold mb-1.5 block">{l}</span>
              <input defaultValue={["María", "López", "maria@example.com", "+51 987 654 321"][i]} className="w-full px-4 py-3 rounded-full border-2 outline-none focus:border-brand text-sm" />
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-6 py-3 rounded-full bg-brand text-brand-foreground font-bold">Guardar cambios</button>
        </div>
      </div>
    </div>
  );
}
