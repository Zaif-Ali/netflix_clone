import { create } from 'zustand';

export interface ModalStoreInterface {
  movieId?: string;
  profilename?: string;
  profileId? : string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
  SetProfile: (name: string , id : string) => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  profileId : undefined,
  profilename: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  SetProfile: (name: string , id : string) => set({ profilename: name  , profileId : id}),
}));

export default useInfoModalStore;