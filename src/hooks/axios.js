import useSWR from 'swr';

// TODO: Voltar a usar a api original quando tiver o endpoint no backend.
// import api from '../services/api';
import { apiFake as api } from 'services/api';

export function useAxios(url) {
  const { data, error, mutate } = useSWR(url, async url => {
    const response = await api.get(url);
    return response.data;
  }
  );

  return { data, error, mutate };
}
