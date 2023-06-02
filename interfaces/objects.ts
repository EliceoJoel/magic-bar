
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

export interface IPath {
	id: string;
};