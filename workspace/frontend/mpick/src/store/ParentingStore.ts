import { create } from "zustand";

interface Parentingstate {
  parenting: string;
  setParenting: (parenting: string) => void;
  foodId: number;
  setFoodId: (foodId: number) => void;
}

export const useParentingStore = create<Parentingstate>((set) => ({
  parenting: "",
  setParenting: (parenting: string) => set({ parenting }),
  foodId: 0,
  setFoodId: (foodId: number) => set({ foodId }),
}));
