import Link from "next/link";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";

import { FaCocktail } from "react-icons/fa";

import GoogleButton from "@/components/GoogleButton";
import { signInFormSchema, getYupSchema } from "@/yup/schemas";
import { signInUser } from "@/firebase/authentication";
import { useUserStore } from '@/store/userStore';

type Inputs = {
	email: string;
	password: string;
};

function SignIn() {
	const router = useRouter();
	const registerUserinStore = useUserStore(state => state.registerUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>(getYupSchema(signInFormSchema));

	const onSubmit = handleSubmit(async (data) => {
		const userLoggedIn = await signInUser(data);
		// Save user logged in store
		registerUserinStore(userLoggedIn);
		// Redirect to catalog page
		router.push("/catalog");
	});

	const signInByGoogleMethod = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
		onError: (tokenResponse) => console.log(tokenResponse),
	});

	return (
		<div className="h-screen flex items-center justify-center">
			<main className="w-full max-w-fit ssm:max-w-xs sm:max-w-sm">
				<span className="flex justify-center mb-4 text-primary">
					<FaCocktail className="h-8 w-8" />
				</span>
				<h1 className="font-bold text-3xl text-center mb-2 mr-4">Sign in</h1>
				<form className="flex flex-col gap-2" onSubmit={onSubmit}>
					<div className="form-control w-full">
						<label htmlFor="emailInput" className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							autoComplete="off"
							id="emailInput"
							type="email"
							placeholder="name@example.com"
							className="input input-bordered input-primary w-full"
							{...register("email")}
						/>
						{errors.email && (
							<span className="text-sm text-error mt-1" role="alert">
								{errors.email.message}
							</span>
						)}
					</div>
					<div className="form-control w-full">
						<label htmlFor="passwordInput" className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							autoComplete="off"
							id="passwordInput"
							type="password"
							placeholder="Type your password"
							className="input input-bordered input-primary w-full"
							{...register("password")}
						/>
						{errors.password && (
							<span className="text-sm text-error mt-1" role="alert">
								{errors.password.message}
							</span>
						)}
					</div>
					<button type="submit" className="btn btn-primary w-full mt-4 normal-case text-base">
						Sign in
					</button>
					<p className="mt-2 text-center">
						New at magic bar?{" "}
						<Link href="/signup" className="text-primary">
							Sign up
						</Link>
					</p>
					<div className="divider">OR</div>
					<GoogleButton onClick={signInByGoogleMethod} text="Sign in with Google" />
				</form>
			</main>
		</div>
	);
}

export default SignIn;
