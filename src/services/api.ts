// ─── API Client for BMC Laravel Backend ──────────────────
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function fetchJson<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${endpoint}`);
  return res.json();
}

// ── Types ────────────────────────────────────────────────────
export interface Speaker {
  id: number;
  name: string;
  title: string | null;
  institution: string;
  photo: string | null;
  type: 'keynote' | 'plenary';
  sort_order: number;
}

export interface TimelineEvent {
  id: number;
  icon_name: string;
  date: string;
  title: string;
  description: string;
  is_highlight: boolean;
  sort_order: number;
}

export interface Scope {
  id: number;
  name: string;
  is_featured: boolean;
  sort_order: number;
}

export interface PosterType {
  id: number;
  name: string;
  sort_order: number;
}

export interface Publication {
  id: number;
  name: string;
  indexing: string;
  url: string;
  sort_order: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  sort_order: number;
}

export interface StatItem {
  id: number;
  icon_name: string;
  value: string;
  label: string;
  sort_order: number;
}

export interface ContactItem {
  id: number;
  icon_name: string;
  label: string;
  value: string;
  href: string;
  sort_order: number;
}

export interface Fee {
  id: number;
  category: string;
  title: string;
  icon_name: string;
  fees_data: Record<string, string>;
  is_highlight: boolean;
  sort_order: number;
}

export interface PaymentInfo {
  id: number;
  type: string;
  data: Record<string, string>;
}

export interface AllData {
  speakers: Speaker[];
  timeline: TimelineEvent[];
  scopes: Scope[];
  poster_types: PosterType[];
  publications: Publication[];
  gallery: GalleryImage[];
  stats: StatItem[];
  contacts: ContactItem[];
  fees: Fee[];
  payment_info: PaymentInfo[];
  settings: Record<string, string>;
}

export interface FeesResponse {
  fees: Fee[];
  payment_info: PaymentInfo[];
}

// ── API functions ────────────────────────────────────────────
export const api = {
  getAll: () => fetchJson<AllData>('/all'),
  getSpeakers: () => fetchJson<Speaker[]>('/speakers'),
  getTimeline: () => fetchJson<TimelineEvent[]>('/timeline'),
  getScopes: () => fetchJson<Scope[]>('/scopes'),
  getPosterTypes: () => fetchJson<PosterType[]>('/poster-types'),
  getPublications: () => fetchJson<Publication[]>('/publications'),
  getGallery: () => fetchJson<GalleryImage[]>('/gallery'),
  getStats: () => fetchJson<StatItem[]>('/stats'),
  getContacts: () => fetchJson<ContactItem[]>('/contacts'),
  getFees: () => fetchJson<FeesResponse>('/fees'),
  getSettings: () => fetchJson<Record<string, string>>('/settings'),
};

export default api;
