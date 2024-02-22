import { create } from "zustand";

interface GlobalState {
	noteCount: number
}

export const useGlobalState = create<GlobalState>()((set) => ({
	noteCount: 1,
	setNoteCount: (noteCount: number) => set({ noteCount })
}));