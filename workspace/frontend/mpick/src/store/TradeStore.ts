import { create } from "zustand";

interface TradeState {
  postItemList: any[] 
  postId: number
  postTitle: string
}

export const useTradeStore = create<TradeState>((set) => ({
  postItemList: [],
  postId: 0,
  postTitle: '',
  setPostId: (postId: number) => set({ postId }),
  setPostTitle: (postTitle: string) => set({ postTitle }),
}));


