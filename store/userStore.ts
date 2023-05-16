import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	user: any;
}

interface Actions {
	register: (user: any) => void;
	logout: () => void;
}

export const useUserStore = create(
	persist<State & Actions>(
		(set) => ({
			user: null,
			register: (user) => set(() => ({ user: user })),
			logout: () => set(() => ({ user: null })),
		}),
		{
			name: "userStorage",
		}
	)
);
