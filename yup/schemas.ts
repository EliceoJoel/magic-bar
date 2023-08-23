import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { emailRegExp } from "@/constants/all";
import { isValidEditedImageType, isValidImageType } from "@/utils/validation";

export const signUpFormSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	lastName: Yup.string().required("Last name is required field"),
	email: Yup.string().required("Email is required field").matches(emailRegExp, "Invalid email pattern"),
	password: Yup.string().required("Password is required field").min(6, "Minimum 6 characters required in password"),
	confirmPassword: Yup.string()
		.required("Confirm password is required field")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const signInFormSchema = Yup.object().shape({
	email: Yup.string().required("Email is required field"),
	password: Yup.string().required("Password is required field"),
});

export const newUserSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	lastName: Yup.string().required("Last name is required field"),
	email: Yup.string().required("Email is required field").matches(emailRegExp, "Invalid email pattern"),
	role: Yup.string().required("Select a role for user is required"),
	password: Yup.string().required("Password is required field").min(6, "Minimum 6 characters required in password"),
	confirmPassword: Yup.string()
		.required("Confirm password is required field")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const editUserSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	lastName: Yup.string().required("Last name is required field"),
	role: Yup.string().required("Select a role for user is required"),
});

export const newProductSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	brand: Yup.string().required("Brand is required field"),
	category: Yup.string().required("Category is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	image: Yup.mixed()
		.test("is-there-file", "Image not uploaded", (value: any) => !!value[0])
		.test("is-valid-image", "Image uploaded is not valid", (value) => isValidImageType(value)),
	promotionPrice: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Promotion price must be a number")
		.positive("Price can't be negative"),
});

export const editProductSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	brand: Yup.string().required("Brand is required field"),
	category: Yup.string().required("Category is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	image: Yup.mixed().test("is-valid-image", "Image uploaded is not valid", (value) => isValidEditedImageType(value)),
	promotionPrice: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Promotion price must be a number")
		.positive("Price can't be negative"),
});

export const newComboSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	normalPrice: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Normal price must be a number")
		.positive("Normal price can't be negative")
		.required("Normal price is required field"),
	image: Yup.mixed()
		.test("is-there-file", "Image not uploaded", (value: any) => !!value[0])
		.test("is-valid-image", "Image uploaded is not valid", (value) => isValidImageType(value)),
});

export const editComboSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	normalPrice: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Normal price must be a number")
		.positive("Normal price can't be negative")
		.required("Normal price is required field"),
	image: Yup.mixed().test("is-valid-image", "Image uploaded is not valid", (value) => isValidEditedImageType(value)),
});

export const newGameSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	image: Yup.mixed()
		.test("is-there-file", "Image not uploaded", (value: any) => !!value[0])
		.test("is-valid-image", "Image uploaded is not valid", (value) => isValidImageType(value)),
});

export const editGameSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	price: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Price must be a number")
		.positive("Price can't be negative")
		.required("Price is required field"),
	image: Yup.mixed().test("is-valid-image", "Image uploaded is not valid", (value) => isValidEditedImageType(value)),
});

export const newOrderSchema = Yup.object().shape({
	tableNumber: Yup.number()
		.transform((value) => (isNaN(value) ? undefined : value))
		.typeError("Table number must be a number")
		.positive("Table number can't be negative")
		.integer("Table number must be integer number")
		.required("Table number is required field"),
});

export const searchSchema = Yup.object().shape({
	search: Yup.string(),
});

export function getYupSchema(yupSchema: Yup.ObjectSchema<any, Yup.AnyObject, any, "">) {
	return { resolver: yupResolver(yupSchema) };
}
