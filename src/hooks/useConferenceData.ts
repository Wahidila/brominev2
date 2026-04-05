import { useState, useEffect } from 'react';
import api, { type AllData } from '@/services/api';

/**
 * Fetches all conference data in a single request.
 * Returns individual typed arrays plus settings.
 */
export function useConferenceData() {
  const [data, setData] = useState<AllData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    api.getAll()
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

/**
 * Generic hook that fetches a single API resource.
 */
function useFetch<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((d) => { if (!cancelled) setData(d); })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}

export const useSpeakers    = () => useFetch(api.getSpeakers);
export const useTimeline    = () => useFetch(api.getTimeline);
export const useScopes      = () => useFetch(api.getScopes);
export const usePosterTypes = () => useFetch(api.getPosterTypes);
export const usePublications= () => useFetch(api.getPublications);
export const useGallery     = () => useFetch(api.getGallery);
export const useStats       = () => useFetch(api.getStats);
export const useContacts    = () => useFetch(api.getContacts);
export const useFees        = () => useFetch(api.getFees);
export const useSettings    = () => useFetch(api.getSettings);
