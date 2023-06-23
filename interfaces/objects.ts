
export interface IProductForFirebase {
	name: string;
	brand: string;
	price: number;
	category: string;
	image: File;
	additional: string;
	createdAt: Date;
}

export interface IProductFromFirebase {
	id: string;
	name: string;
	brand: string;
	price: number;
	category: string;
	image: string;
	additional: string;
	createdAt: Date;
}

export interface IComboForFirebase {
	name: string;
	price: number;
	normalPrice: number;
	image: File;
	createdAt: Date;
}

export interface IComboFromFirebase {
	id: string;
	name: string;
	price: number;
	normalPrice: number;
	image: string;
	createdAt: Date;
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
};