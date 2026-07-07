import type { Urgency } from "@/lib/mock-data";
import { conditionLabel, urgencyLabel, urgencyLevel, type TriageResponse } from "@/lib/triage-api";

const STORAGE_KEY = "petcare.triage.history.v1";

export type StoredTriage = {
  id: string;
  month: string;
  petId: string;
  pet: string;
  condition: string;
  zone: string;
  confidence: number;
  urgency: Urgency;
  urgencyLabel: string;
  date: string;
  modelVersion: string;
  resultState: string;
};

function storageAvailable() {
  if (typeof window === "undefined") return false;
  try {
    const testKey = "__petcare_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function readStoredTriages(): StoredTriage[] {
  if (!storageAvailable()) return [];
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return [];
  }
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredTriage[]) : [];
  } catch {
    return [];
  }
}

export function writeStoredTriage(record: StoredTriage) {
  if (!storageAvailable()) return;
  const current = readStoredTriages().filter((item) => item.id !== record.id);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...current].slice(0, 40)));
  } catch {
    // Best effort only: disabled storage or quota issues should not break analysis.
  }
}

export function storedTriageFromResponse({
  response,
  petId,
  petName,
  zone,
}: {
  response: TriageResponse;
  petId: string;
  petName: string;
  zone: string;
}): StoredTriage {
  const now = new Date();
  const prediction = response.prediction;
  const urgency = prediction?.urgency || "invalid";
  return {
    id: response.triageId,
    month: new Intl.DateTimeFormat("es-PE", { month: "long", year: "numeric" }).format(now),
    petId,
    pet: petName,
    condition: prediction?.displayName || conditionLabel(prediction?.condition || "unknown"),
    zone,
    confidence: prediction ? Math.round(prediction.confidence * 100) : 0,
    urgency: urgencyLevel(urgency) as Urgency,
    urgencyLabel: urgencyLabel(urgency),
    date: new Intl.DateTimeFormat("es-PE", { day: "2-digit", month: "short" }).format(now),
    modelVersion: response.model.version,
    resultState: response.resultState,
  };
}
