import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";

import { FaCocktail } from "react-icons/fa";

import GoogleButton from "@/components/GoogleButton";
import { emailRegExp } from "@/constants/all";

type Inputs = {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

function SignUp() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});
	const signUpByGoogleMethod = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			const userInfo = await getUserInfoFromGoogle(
				tokenResponse.access_token
			);
		},
		onError: (tokenResponse) => console.log(tokenResponse),
	});
	return (
		<div className="h-screen flex items-center justify-center">
			<main className="w-full max-w-fit ssm:max-w-xs sm:max-w-sm">
				<span className="flex justify-center mb-4 text-primary">
					<FaCocktail className="h-8 w-8" />
				</span>
				<h1 className="font-bold text-3xl text-center mb-2 mr-4">
					Create an account
				</h1>
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
								className={`input input-bordered input-primary w-full ${
									errors.name && "input-error"
								}`}
								{...register("name", {
									required: "This is required field",
								})}
							/>
							{errors.name && (
								<span className="text-sm text-error mt-1">
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
								className={`input input-bordered input-primary w-full ${
									errors.lastName && "input-error"
								}`}
								{...register("lastName", {
									required: "This is required field",
								})}
							/>
							{errors.lastName && (
								<span className="text-sm text-error mt-1">
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
							type="text"
							placeholder="name@example.com"
							className={`input input-bordered input-primary w-full ${
								errors.email && "input-error"
							}`}
							{...register("email", {
								required: "This is required field",
								pattern: {
									value: emailRegExp,
									message: "Invalid email address"
								},
							})}
						/>
						{errors.email && (
							<span className="text-sm text-error mt-1">
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
							placeholder="Type your password"
							className={`input input-bordered input-primary w-full ${
								errors.password && "input-error"
							}`}
							{...register("password", {
								required: "This is required field",
								min: 6,
							})}
						/>
						{errors.password && (
							<span className="text-sm text-error mt-1">
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
							className={`input input-bordered input-primary w-full ${
								errors.confirmPassword && "input-error"
							}`}
							{...register("confirmPassword", {
								required: "This is required field",
							})}
						/>
						{errors.confirmPassword && (
							<span className="text-sm text-error mt-1">
								{errors.confirmPassword.message}
							</span>
						)}
					</div>
					<button
						type="submit"
						className="btn btn-primary w-full mt-4 normal-case text-base"
					>
						Sign up
					</button>
					<p className="mt-2 text-center">
						Do you already have an account?{" "}
						<Link href="/signin" className="text-primary">
							Sign in
						</Link>
					</p>
					<div className="divider">OR</div>
					<GoogleButton
						onClick={signUpByGoogleMethod}
						text="Sign up with Google"
					/>
				</form>
			</main>
		</div>
	);
}

async function getUserInfoFromGoogle(userToken: string) {
	try {
		const response = await fetch(
			`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userToken}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${userToken}`,
					"Content-Type": "application/json",
				},
			}
		);
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		console.log(error);
	}
}

export default SignUp;
