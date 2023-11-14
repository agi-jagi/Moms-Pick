import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TradeState {
  searchWord: string | null
  setSearchWord: (searchWord: string) => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      searchWord: null,
      setSearchWord: (searchWord: string) => set({ searchWord }),
    }),
    {
      name: "trade-storage",
    }
  )
);

// useTradeStore.subscribe((state) => {
//   console.log('postItemList:', state.postItemList);
//   console.log('postId:', state.postId);
//   console.log('postTitle:', state.postTitle);
// });



