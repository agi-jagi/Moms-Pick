import { create } from "zustand";

interface Monthstate {
  month: string;
  setMonth: (month: string) => void;
  article: string;
  setArticle: (article: string) => void;
}

export const useMonthStore = create<Monthstate>((set) => ({
  month: "",
  article: "수유 용품",
  setMonth: (month: string) => set({ month }),
  setArticle: (article: string) => set({ article }),
}));
