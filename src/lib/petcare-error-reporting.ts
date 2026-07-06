type PetcareErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type PetcareEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: PetcareErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __petcareEvents?: PetcareEvents;
  }
}

export function reportPetcareError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__petcareEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
