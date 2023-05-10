import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	user: any;
}

interface Actions {
	registerUser: (user: any) => void;
	logoutUser: () => void;
}

export const useUserStore = create(
	persist<State & Actions>(
		(set) => ({
			user: null,
			registerUser: (user) => set(() => ({ user: user })),
			logoutUser: () => set(() => ({ user: null })),
		}),
		{
			name: "user",
		}
	)
);
