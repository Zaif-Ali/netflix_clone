
import axios from "axios";
import useSwr from 'swr'

const fetcher = (url: string) => axios.get(url).then(res => res.data);

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