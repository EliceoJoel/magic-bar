import { emptyUserLogged } from "@/constants/all";
import { IUser } from "@/interfaces/objects";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
	user: IUser;
}

interface Actions {
	register: (user: any) => void;
	logout: () => void;
}

export const useUserStore = create(
	persist<State & Actions>(
		(set) => ({
			user: emptyUserLogged,
			register: (user) => set(() => ({ user: user })),
			logout: () => set(() => ({ user: emptyUserLogged })),
		}),
		{
			name: "userStorage",
		}
	)
);
