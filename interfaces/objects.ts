export interface ISignUpUserData {
	name: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISignIpUserData {
	email: string;
	password: string;
}

export interface IUser {
	name: string;
	lastName: string;
	email: string;
	role: string;
}

export interface IUserFromFirebase {
	id: string;
	name: string;
	lastName: string;
	email: string;
	role: string;
	createdAt: ITimestampsFromFirebase;
	updatedAt: ITimestampsFromFirebase;
}

export interface ICatalog {
	promotions: IProductFromFirebase[];
	combos: IComboFromFirebase[];
	games: IGameFromFirebase[];
}

export interface IProductForFirebase {
	name: string;
	brand: string;
	price: number;
	category: string;
	image: File;
	additional: string;
	promotionPrice: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IProductToEditForFirebase {
	id: string;
	name: string;
	brand: string;
	price: number;
	category: string;
	image: File;
	additional: string;
	promotionPrice: number;
	updateAt: Date;
}

export interface IProductFromFirebase {
	id: string;
	name: string;
	brand: string;
	price: number;
	category: string;
	image: string;
	additional: string;
	promotionPrice: number;
	createdAt: ITimestampsFromFirebase;
	updatedAt: ITimestampsFromFirebase;
}

export interface IComboForFirebase {
	name: string;
	price: number;
	normalPrice: number;
	image: File;
	createdAt: Date;
	updatedAt: Date;
}

export interface IComboToEditForFirebase {
	id: string;
	name: string;
	price: number;
	normalPrice: number;
	image: File;
	updatedAt: Date;
}

export interface IComboFromFirebase {
	id: string;
	name: string;
	price: number;
	normalPrice: number;
	image: string;
	createdAt: ITimestampsFromFirebase;
	updatedAt: ITimestampsFromFirebase;
}

export interface IGameForFirebase {
	name: string;
	price: number;
	image: File;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGameToEditForFirebase {
	id: string;
	name: string;
	price: number;
	image: File;
	updatedAt: Date;
}

export interface IGameFromFirebase {
	id: string;
	name: string;
	price: number;
	image: string;
	createdAt: ITimestampsFromFirebase;
	updatedAt: ITimestampsFromFirebase;
}

export interface ICartProduct {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
}

export interface IOrderForFirebase {
	tableNumber: number;
	details: string;
	totalprice: number;
	status: string;
	products: Array<ICartProduct>;
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrderFromFirebase {
	id: string;
	tableNumber: number;
	details: string;
	totalprice: number;
	status: string;
	products: Array<ICartProduct>;
	createdAt: ITimestampsFromFirebase;
	updatedAt: ITimestampsFromFirebase;
}

export interface ITimestampsFromFirebase {
	seconds: number;
	nanoseconds: number;
}

export interface IPath {
	id: string;
}

export interface IConfirmationModalvalues {
	message: string;
	actionType: string;
	orderId: string;
}

export interface IUserToUpdateForFirebase {
	id: string;
	name: string;
	lastName: string;
	role: string;
	updatedAt: Date;
}
