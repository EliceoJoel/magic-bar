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
	createdAt: Date;
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
	createdAt: Date;
	updatedAt: Date;
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
	createdAt: Date;
	updatedAt: Date;
}

export interface IComboFromFirebase {
	id: string;
	name: string;
	price: number;
	normalPrice: number;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGameForFirebase {
	name: string;
	price: number;
	image: File;
	createdAt: Date;
}

export interface IGameFromFirebase {
	id: string;
	name: string;
	price: number;
	image: string;
	createdAt: Date;
}

export interface IPath {
	id: string;
}
