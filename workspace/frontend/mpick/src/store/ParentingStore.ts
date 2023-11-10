import { create } from "zustand";

interface Parentingstate {
  parenting: string;
  setParenting: (parenting: string) => void;
}

export const useParentingStore = create<Parentingstate>((set) => ({
  parenting: "",
  setParenting: (parenting: string) => set({ parenting }),
}));
