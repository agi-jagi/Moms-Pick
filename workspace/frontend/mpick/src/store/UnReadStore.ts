import { create } from "zustand";

type UnReadCountState = {
  chatRoomId: number;
  unReadCount: number;
};

type UnReadCountListState = {
  unReadCountList: UnReadCountState[];
  setUnReadCountList: (unReadCountList: UnReadCountState[]) => void;
};

export const useUnReadStore = create<UnReadCountListState>((set) => ({
  unReadCountList: [],
  setUnReadCountList: (unReadCountList: UnReadCountState[]) => set({ unReadCountList }),
}));
