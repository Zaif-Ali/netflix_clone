import { fetcher } from '@/lib';
import useSwr from 'swr'


const useMovie = (movieid?: string) => {
  const { data, error, isLoading } = useSwr(movieid ? `/api/movies/${movieid}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;