import { fetcher } from '@/lib';
import useSwr from 'swr'


const useLoginProfile = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/profile/current', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useLoginProfile;