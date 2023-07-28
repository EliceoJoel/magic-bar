export interface ISignInInputs {
	email: string;
	password: string;
}

export interface ISignUpInputs {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface INewProductInputs {
	name: string;
	brand: string;
	category: string;
	price: number;
	image: FileList;
	additional: string;
	promotionPrice: number | undefined;
}

export interface INewComboInputs {
	name: string;
	price: number;
	normalPrice: number;
	image: FileList;
}

export interface INewGameInputs {
	name: string;
	price: number;
	image: FileList;
}

export interface INewOrderInputs {
	tableNumber: number;
	details: string;
}
