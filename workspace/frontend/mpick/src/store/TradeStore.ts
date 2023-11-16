import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TradeState {
  searchWord: string | null
  setSearchWord: (searchWord: string) => void
  distance: string | null
  setDistance: (distance: string) => void
  storeLongitude: number | null
  setStoreLongitude: (longitude: number) => void
  storeLatitude: number | null
  setStoreLatitude: (latitude: number) => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      searchWord: null,
      setSearchWord: (searchWord: string) => set({ searchWord }),
      distance: "2km",
      setDistance: (distance: string) => set({ distance }),
      storeLongitude: null,
      setStoreLongitude: (storeLongitude: number) => set({ storeLongitude }),
      storeLatitude: null,
      setStoreLatitude: (storeLatitude: number) => set({ storeLatitude }),
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



