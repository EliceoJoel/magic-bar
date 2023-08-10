import {
	ICatalog,
	IComboFromFirebase,
	IGameFromFirebase,
	IOrderFromFirebase,
	IProductFromFirebase,
	IUser,
} from "@/interfaces/objects";

export const emailRegExp =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

export const validImageExtensions: string[] = ["jpg", "png", "jpeg", "svg", "webp"];

export const emptyCatalog: ICatalog = { promotions: [], combos: [], games: [] };

export const emptyProduct: IProductFromFirebase = {
	id: "",
	name: "",
	brand: "",
	price: 0,
	category: "",
	image: "",
	additional: "",
	promotionPrice: 0,
	createdAt: { seconds: 0, nanoseconds: 0 },
	updatedAt: { seconds: 0, nanoseconds: 0 },
};

export const emptyCombo: IComboFromFirebase = {
	id: "",
	name: "",
	price: 0,
	normalPrice: 0,
	image: "",
	createdAt: { seconds: 0, nanoseconds: 0 },
	updatedAt: { seconds: 0, nanoseconds: 0 },
};

export const emptyGame: IGameFromFirebase = {
	id: "",
	name: "",
	price: 0,
	image: "",
	createdAt: { seconds: 0, nanoseconds: 0 },
	updatedAt: { seconds: 0, nanoseconds: 0 },
};

export const emptyUserLogged: IUser = {
	name: "",
	lastName: "",
	email: "",
	role: "",
};

export const emptyOrder: IOrderFromFirebase = {
	id: "",
	tableNumber: 0,
	details: "",
	totalprice: 0,
	status: "",
	products: [],
	createdAt: { seconds: 0, nanoseconds: 0 },
};
