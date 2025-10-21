import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useFetch(url) {
  const { data, error, mutate } = useSWR(url, fetcher);
  return { data, error, mutate };
}
