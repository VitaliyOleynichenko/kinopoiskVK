import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [params, setParams] = useSearchParams();
  return {
    get: (k: string) => params.get(k),
    set: (k: string, v: string) => { params.set(k, v); setParams(params); },
    delete: (k: string) => { params.delete(k); setParams(params); }
  };
}
