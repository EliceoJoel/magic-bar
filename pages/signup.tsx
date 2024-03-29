import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";

import { FaCocktail } from "react-icons/fa";

import GoogleButton from "@/components/GoogleButton";
import { getYupSchema, signUpFormSchema } from "@/yup/schemas";
import { signUpUser } from "@/firebase/authentication";
import { UserType } from "@/constants/enums";
import { useUserStore } from "@/store/userStore";
import { ISignUpInputs } from "@/interfaces/forms";

function SignUp() {
	const router = useRouter();
	const registerUserinStore = useUserStore((state) => state.register);
	const [isSingingUp, setIsSingingUp] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUpInputs>(getYupSchema(signUpFormSchema));

	const onSubmit = handleSubmit(async (data) => {
		// Set loading as started
		setIsSingingUp(true);

		// Sing up on firebase
		const userLogged = await signUpUser({
			...data,
			role: UserType.CLIENT,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Save user logged in store
		registerUserinStore(userLogged);

		// Redirect to catalog page
		router.push("/catalog");

		// Set loading as finished
		setIsSingingUp(false);
	});

	return (
		<div className="h-screen flex items-center justify-center">
			<main className="w-full max-w-fit ssm:max-w-xs sm:max-w-sm">
				<span className="flex justify-center mb-4 text-primary">
					<FaCocktail className="h-8 w-8" />
				</span>
				<h1 className="font-bold text-3xl text-center mb-2 mr-4">Create an account</h1>
				<form className="flex flex-col gap-2" onSubmit={onSubmit}>
					<div className="flex gap-2">
						<div className="form-control w-full">
							<label htmlFor="name" className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								autoComplete="off"
								id="name"
								type="text"
								placeholder="Type your name"
								className={`input input-bordered input-primary w-full ${errors.name && "input-error"}`}
								{...register("name")}
							/>
							{errors.name && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.name.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="lastName" className="label">
								<span className="label-text">Last name</span>
							</label>
							<input
								autoComplete="off"
								id="lastName"
								type="text"
								placeholder="Type your last name"
								className={`input input-bordered input-primary w-full ${errors.lastName && "input-error"}`}
								{...register("lastName")}
							/>
							{errors.lastName && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.lastName.message}
								</span>
							)}
						</div>
					</div>
					<div className="form-control w-full">
						<label htmlFor="email" className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							autoComplete="off"
							id="email"
							type="email"
							placeholder="name@example.com"
							className={`input input-bordered input-primary w-full ${errors.email && "input-error"}`}
							{...register("email")}
						/>
						{errors.email && (
							<span className="text-sm text-error mt-1" role="alert">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="form-control w-full">
						<label htmlFor="password" className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							autoComplete="off"
							id="password"
							type="password"
							placeholder="Type your password, 6+ characters"
							className={`input input-bordered input-primary w-full ${errors.password && "input-error"}`}
							{...register("password")}
						/>
						{errors.password && (
							<span className="text-sm text-error mt-1" role="alert">
								{errors.password.message}
							</span>
						)}
					</div>
					<div className="form-control w-full">
						<label htmlFor="confirmPassword" className="label">
							<span className="label-text">Confirm password</span>
						</label>
						<input
							autoComplete="off"
							id="confirmPassword"
							type="password"
							placeholder="Confirm your password"
							className={`input input-bordered input-primary w-full ${errors.confirmPassword && "input-error"}`}
							{...register("confirmPassword")}
						/>
						{errors.confirmPassword && (
							<span className="text-sm text-error mt-1" role="alert">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
					<button
						type="submit"
						className={`btn btn-primary w-full mt-4 normal-case text-base ${isSingingUp && "loading"}`}
					>
						{isSingingUp ? "Signing up" : "Sign up"}
					</button>
					<p className="mt-2 text-center">
						Do you already have an account?{" "}
						<Link href="/signin" className="text-primary">
							Sign in
						</Link>
					</p>
				</form>
			</main>
		</div>
	);
}

export default SignUp;
