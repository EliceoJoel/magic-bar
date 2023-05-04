import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { emailRegExp } from "@/constants/all";

export const signUpFormSchema = Yup.object().shape({
	name: Yup.string().required("This is required field"),
	lastName: Yup.string().required("This is required field"),
	email: Yup.string().required("This is required field").matches(emailRegExp, "Invalid email pattern"),
	password: Yup.string()
		.required("This is required field")
		.min(6, "Minimum 6 characters required"),
	confirmPassword: Yup.string()
		.required("This is required field")
		.oneOf([Yup.ref("password")], "Passwords does not match"),
});

export function getYupSchema(yupSchema: Yup.ObjectSchema<any, Yup.AnyObject, any, "">) {
	return { resolver: yupResolver(yupSchema) };
}
