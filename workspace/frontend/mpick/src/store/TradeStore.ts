import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TradeState {
  postItemList: any[] 
  postId: number | null
  postTitle: string | null
  setPostId: (postId: number) => void
  setPostTitle: (postTitle: string) => void
}

export const useTradeStore = create<TradeState>()(
  persist(
    (set) => ({
      postItemList: [],
      postId: null,
      postTitle: "기본 제목",
      setPostId: (postId: number) => set({ postId }),
      setPostTitle: (postTitle: string) => set({ postTitle }),
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



