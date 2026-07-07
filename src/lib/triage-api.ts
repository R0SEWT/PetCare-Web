export const TRIAGE_API_BASE_URL = import.meta.env.VITE_TRIAGE_API_URL || "http://localhost:8000";

export type TriageResultState = "completed" | "low_confidence" | "out_of_distribution" | "invalid";

export type TriageUrgency = "no_urgency" | "follow_up" | "consult_soon" | "urgent" | "invalid";

export type TriageResponse = {
  triageId: string;
  status: "completed";
  resultState: TriageResultState;
  clientRequestId?: string | null;
  model: {
    name: string;
    version: string;
    datasetVersion: string;
    calibrationVersion: string;
  };
  latencyMs: number;
  imageQuality: {
    isAcceptable: boolean;
    issues: string[];
  };
  ood: {
    isOutOfDistribution: boolean;
    score: number;
    reason: string | null;
  };
  prediction: {
    condition: string;
    displayName: string;
    confidence: number;
    urgency: TriageUrgency;
    topK: Array<{ condition: string; confidence: number }>;
  } | null;
  recommendations: string[];
  safety: {
    message: string;
    requiresVeterinarian: boolean;
  };
};

export type TriageErrorResponse = {
  error: {
    code: string;
    message: string;
    retryable: boolean;
    clientRequestId?: string | null;
  };
};

export type AnalyzeTriageInput = {
  image: File;
  petId: string;
  species: "dog" | "cat";
  bodyRegion: string;
  consentForModelImprovement: boolean;
  petAgeMonths?: number;
  breed?: string;
  symptomNotes?: string;
  clientRequestId: string;
};

export class TriageApiError extends Error {
  code: string;
  retryable: boolean;
  status: number;

  constructor(status: number, payload: TriageErrorResponse) {
    super(payload.error.message);
    this.name = "TriageApiError";
    this.status = status;
    this.code = payload.error.code;
    this.retryable = payload.error.retryable;
  }
}

export function speciesToApi(species: string): "dog" | "cat" {
  return species.toLowerCase().startsWith("g") ? "cat" : "dog";
}

export function conditionLabel(condition: string) {
  const labels: Record<string, string> = {
    atopic_dermatitis: "Dermatitis Atópica",
    dermatophytosis: "Dermatofitosis",
    allergic_contact_dermatitis: "Dermatitis Alérgica por Contacto",
    fungal_malassezia: "Infección Fúngica",
    bacterial_pyoderma: "Pioderma Bacteriana",
    unknown: "Sin clasificación concluyente",
  };
  return labels[condition] || condition;
}

export function urgencyLabel(urgency: TriageUrgency) {
  const labels: Record<TriageUrgency, string> = {
    no_urgency: "Sin urgencia",
    follow_up: "Seguimiento",
    consult_soon: "Consultar pronto",
    urgent: "Prioridad alta",
    invalid: "No concluyente",
  };
  return labels[urgency];
}

export function urgencyLevel(urgency: TriageUrgency) {
  if (urgency === "urgent") return "danger";
  if (urgency === "consult_soon") return "warning";
  if (urgency === "follow_up" || urgency === "invalid") return "info";
  return "success";
}

export async function analyzeTriage(input: AnalyzeTriageInput): Promise<TriageResponse> {
  const form = new FormData();
  form.set("image", input.image);
  form.set("petId", input.petId);
  form.set("species", input.species);
  form.set("bodyRegion", input.bodyRegion);
  form.set("consentForModelImprovement", String(input.consentForModelImprovement));
  form.set("clientRequestId", input.clientRequestId);
  if (input.petAgeMonths !== undefined) form.set("petAgeMonths", String(input.petAgeMonths));
  if (input.breed) form.set("breed", input.breed);
  if (input.symptomNotes) form.set("symptomNotes", input.symptomNotes);

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${TRIAGE_API_BASE_URL}/api/triage/analyze`, {
      method: "POST",
      body: form,
      signal: controller.signal,
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new TriageApiError(response.status, payload as TriageErrorResponse);
    }
    return payload as TriageResponse;
  } finally {
    window.clearTimeout(timeout);
  }
}
