export type Urgency = "success" | "warning" | "danger" | "info";

// 5 dermatological conditions covered by the YOLOv8 model
export const conditions = [
  "Dermatitis Atópica",
  "Dermatofitosis (Tiña)",
  "Dermatitis Alérgica por Contacto",
  "Infección Fúngica (Malassezia)",
  "Pioderma Bacteriana",
];

export const pets = [
  { id: "1", name: "Luna", species: "Perro", breed: "Golden Retriever", age: "3 años", emoji: "🐕", urgency: "success" as Urgency, urgencyLabel: "Sin urgencia", triages: 4 },
  { id: "2", name: "Milo", species: "Gato", breed: "Siamés", age: "2 años", emoji: "🐈", urgency: "warning" as Urgency, urgencyLabel: "Consultar pronto", triages: 7 },
  { id: "3", name: "Rocky", species: "Perro", breed: "Bulldog", age: "5 años", emoji: "🐶", urgency: "danger" as Urgency, urgencyLabel: "Urgencia alta", triages: 2 },
  { id: "4", name: "Nala", species: "Gato", breed: "Persa", age: "1 año", emoji: "🐱", urgency: "info" as Urgency, urgencyLabel: "Seguimiento", triages: 3 },
];

export const triages = [
  { id: "t1", month: "Junio 2026", petId: "2", pet: "Milo", condition: "Dermatofitosis (Tiña)", zone: "Oreja derecha", confidence: 82, urgency: "warning" as Urgency, urgencyLabel: "Consultar pronto", date: "14 Jun" },
  { id: "t2", month: "Junio 2026", petId: "1", pet: "Luna", condition: "Dermatitis Alérgica por Contacto", zone: "Vientre", confidence: 76, urgency: "success" as Urgency, urgencyLabel: "Sin urgencia", date: "09 Jun" },
  { id: "t3", month: "Junio 2026", petId: "3", pet: "Rocky", condition: "Pioderma Bacteriana", zone: "Flanco izquierdo", confidence: 91, urgency: "danger" as Urgency, urgencyLabel: "Urgencia alta", date: "02 Jun" },
  { id: "t4", month: "Mayo 2026", petId: "4", pet: "Nala", condition: "Infección Fúngica (Malassezia)", zone: "Base de la cola", confidence: 68, urgency: "info" as Urgency, urgencyLabel: "Seguimiento", date: "28 May" },
  { id: "t5", month: "Mayo 2026", petId: "1", pet: "Luna", condition: "Dermatitis Atópica", zone: "Patas", confidence: 73, urgency: "success" as Urgency, urgencyLabel: "Sin urgencia", date: "12 May" },
  { id: "t6", month: "Abril 2026", petId: "2", pet: "Milo", condition: "Dermatitis Atópica", zone: "Cuello", confidence: 79, urgency: "warning" as Urgency, urgencyLabel: "Consultar pronto", date: "22 Abr" },
];

// Model performance metrics (KPIs from the report)
export const modelMetrics = {
  accuracy: 87,
  recall: 92,
  precision: 89,
  falseNegativeRate: 8,
  version: "YOLOv8n v1.2",
};

// Preventive recommendations per condition (USC-03)
export const recommendations: Record<string, string[]> = {
  "Dermatitis Atópica": [
    "Evita el contacto con polen, polvo y ácaros en casa.",
    "Baña a tu mascota con shampoo hipoalergénico cada 7–10 días.",
    "Mantén una dieta rica en ácidos grasos Omega-3.",
  ],
  "Dermatofitosis (Tiña)": [
    "Aísla a tu mascota de otros animales para evitar contagio.",
    "Desinfecta camas, juguetes y superficies con frecuencia.",
    "Evita compartir cepillos o accesorios con otras mascotas.",
  ],
  "Dermatitis Alérgica por Contacto": [
    "Identifica y elimina el posible alérgeno (planta, tela, producto).",
    "Lava la zona afectada con agua tibia y jabón neutro.",
    "Evita collares antipulgas con químicos agresivos.",
  ],
  "Infección Fúngica (Malassezia)": [
    "Seca bien pliegues, orejas y patas tras los baños.",
    "Reduce humedad ambiental en zonas donde duerme.",
    "Consulta sobre shampoos antifúngicos veterinarios.",
  ],
  "Pioderma Bacteriana": [
    "No rasques ni manipules la lesión.",
    "Mantén el pelaje corto alrededor del área afectada.",
    "Acude a un veterinario para evaluar antibióticos.",
  ],
};

// Admin users mock list (USC-09)
export const adminUsers = [
  { id: "u1", name: "María López", email: "maria@example.com", role: "Dueño", pets: 4, triages: 16, joined: "12 Mar 2026", status: "Activo" },
  { id: "u2", name: "Carlos Ruiz", email: "carlos@example.com", role: "Dueño", pets: 2, triages: 9, joined: "03 Abr 2026", status: "Activo" },
  { id: "u3", name: "Ana Torres", email: "ana@example.com", role: "Dueño", pets: 1, triages: 2, joined: "21 Abr 2026", status: "Activo" },
  { id: "u4", name: "Dr. Jorge Quispe", email: "jorge@vet.pe", role: "Veterinario", pets: 0, triages: 0, joined: "01 May 2026", status: "Activo" },
  { id: "u5", name: "Lucía Mendoza", email: "lucia@example.com", role: "Dueño", pets: 3, triages: 11, joined: "08 May 2026", status: "Inactivo" },
  { id: "u6", name: "CapyGeeks Admin", email: "admin@capygeeks.com", role: "Admin", pets: 0, triages: 0, joined: "01 Ene 2026", status: "Activo" },
];
