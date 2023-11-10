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