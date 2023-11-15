import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TradeState {
  searchWord: string | null
  setSearchWord: (searchWord: string) => void
  distance: string | null
  setDistance: (distance: string) => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      searchWord: null,
      setSearchWord: (searchWord: string) => set({ searchWord }),
      distance: "2km",
      setDistance: (distance: string) => set({ distance }),
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



