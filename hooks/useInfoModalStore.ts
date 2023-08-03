import { create } from 'zustand';

export interface ModalStoreInterface {
  movieId?: string;
  profilename?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
  SetProfile: (name: string) => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  profilename: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
  SetProfile: (name: string) => set({ profilename: name }),
}));

export default useInfoModalStore;