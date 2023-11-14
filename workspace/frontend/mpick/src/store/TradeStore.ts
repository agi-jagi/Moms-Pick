import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TradeState {
  searchWord: string | null
  setSearchWord: (searchWord: string) => void
  distance: number | null
  setDistance: (distance: number) => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      searchWord: null,
      setSearchWord: (searchWord: string) => set({ searchWord }),
      distance: null,
      setDistance: (distance: number) => set({ distance }),
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



