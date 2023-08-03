
import { fetcher } from "@/lib";
import useSwr from 'swr'



const useCurrentUser =  () => {
  let { data, error, isLoading, mutate } =  useSwr('/api/current', fetcher);



  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useCurrentUser;