import { create } from "zustand";

type MessageDataState = {
  chatMessageId: number;
  chatRoomId: number;
  dataTime: string;
  message: string;
  toMe: boolean;
};

type MessageListState = {
  socket: any;
  messageStore: MessageDataState[];
  setSocket: (socket: any) => void;
  setMessageStore: (messageList: MessageDataState[]) => void;
};

export const useChattingStore = create<MessageListState>((set) => ({
  socket: {},
  messageStore: [],
  setSocket: (socket: any) => set((state) => ({ ...state, socket })),
  setMessageStore: (messageStore: MessageDataState[]) => set({ messageStore }),
}));

interface OpponentState {
  nickName: string;
  setNickName: (value: string) => void;
}

export const useOpponent = create<OpponentState>((set) => ({
  nickName: "",
  setNickName: (value) => set(() => ({ nickName: value })),
}));

interface UserState {
  userNickName: string;
  setUserNickName: (value: string) => void;
}

export const useNickNameSet = create<UserState>((set) => ({
  userNickName: "",
  setUserNickName: (value) => set(() => ({ userNickName: value })),
}));

interface SellerState {
  sellerNickName: string;
  setSellerNickName: (value: string) => void;
}

export const useSellerNickNameSet = create<SellerState>((set) => ({
  sellerNickName: "",
  setSellerNickName: (value) => set(() => ({ sellerNickName: value })),
}));
