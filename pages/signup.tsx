import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";

import { FaCocktail } from "react-icons/fa";

import GoogleButton from "@/components/GoogleButton";

function SignUp() {
   const signUp = useGoogleLogin({
		onSuccess: (tokenResponse) => console.log(tokenResponse),
		onError: (tokenResponse) => console.log(tokenResponse),
	});
	return (
		<div className="h-screen flex items-center justify-center">
			<main className="w-full p-4 md:w-1/4">
				<span className="flex justify-center mb-4 text-primary">
					<FaCocktail className="h-8 w-8" />
				</span>
				<h1 className="font-bold text-3xl text-center mb-2 mr-4">
					Create an account
				</h1>
				<div className="flex flex-col gap-2">
					<div className="flex gap-2">
						<div className="form-control w-full">
							<label htmlFor="nameInput" className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								id="nameInput"
								type="text"
								placeholder="Type your name"
								className="input input-bordered input-primary w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label htmlFor="lastnameInput" className="label">
								<span className="label-text">Last name</span>
							</label>
							<input
								id="lastnameInput"
								type="text"
								placeholder="Type your last name"
								className="input input-bordered input-primary w-full"
							/>
						</div>
					</div>
					<div className="form-control w-full">
						<label htmlFor="emailInput" className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							id="emailInput"
							type="email"
							placeholder="name@example.com"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label htmlFor="passwordInput" className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							id="passwordInput"
							type="password"
							placeholder="Type your password"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label htmlFor="confirmPasswordInput" className="label">
							<span className="label-text">Confirm password</span>
						</label>
						<input
							id="confirmPasswordInput"
							type="password"
							placeholder="Confirm your password"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<Link href="/catalog" className="btn btn-primary w-full mt-4 normal-case text-base">
						Sign up
					</Link>
					<p className="mt-2 text-center">
						Do you already have an account?{" "}
						<Link href="/signin" className="text-primary">
							Sign in
						</Link>
					</p>
               <div className="divider">OR</div>
					<GoogleButton onClick={signUp} text="Sign up with Google" />
				</div>
			</main>
		</div>
	);
}

export default SignUp;
