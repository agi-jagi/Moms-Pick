import { create } from "zustand";

interface ConnectingStore {
  isConnect: boolean;
  setIsConnect: () => void;
}

export const useConnecting = create<ConnectingStore>((set) => ({
  isConnect: false,
  setIsConnect: () => set((state) => ({ isConnect: !state.isConnect })),
}));
