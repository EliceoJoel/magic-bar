
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
}
