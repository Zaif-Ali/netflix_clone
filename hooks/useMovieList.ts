import { fetcher } from '@/lib';
import useSwr from 'swr'


const useMoviesList = () => {
  const { data, error, isLoading } = useSwr('/api/movies', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data ,
    error,
    isLoading
  }
};

export default useMoviesList;