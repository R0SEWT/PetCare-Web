import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from "./routeTree.gen";

// 1. Creamos la instancia de QueryClient de forma local
const queryClient = new QueryClient()

// 2. Pasamos el queryClient al contexto del router al crearlo
export function createRouter() {
  return createTanStackRouter({
    routeTree,
    context: {
      queryClient,
    },
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}