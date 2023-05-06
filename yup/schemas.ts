import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { emailRegExp } from "@/constants/all";

export const signUpFormSchema = Yup.object().shape({
	name: Yup.string().required("Name is required field"),
	lastName: Yup.string().required("Last name is required field"),
	email: Yup.string()
		.required("Email is required field")
		.matches(emailRegExp, "Invalid email pattern"),
	password: Yup.string()
		.required("Password is required field")
		.min(6, "Minimum 6 characters required in password"),
	confirmPassword: Yup.string()
		.required("Confirm password is required field")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
});

export const signInFormSchema = Yup.object().shape({
	email: Yup.string().required("Email is required field"),
	password: Yup.string().required("Password is required field"),
});

export function getYupSchema(
	yupSchema: Yup.ObjectSchema<any, Yup.AnyObject, any, "">
) {
	return { resolver: yupResolver(yupSchema) };
}
