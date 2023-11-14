import { create } from "zustand";

interface MyStore {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
  reset: () => void;
}

export const useUnReadStore = create<MyStore>((set) => ({
  count: 0,
  increment: (value) => set((state) => ({ count: state.count + value })),
  decrement: (value) => set((state) => ({ count: state.count - value })),
  reset: () => set({ count: 0 }),
}));
