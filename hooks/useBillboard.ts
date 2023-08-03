import { fetcher } from '@/lib';
import useSwr from 'swr'


const useBillboard = () => {
  const { data, error, isLoading } = useSwr('/api/Random', fetcher, { 
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

export default useBillboard;