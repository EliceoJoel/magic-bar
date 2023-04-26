import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";

import { FaCocktail } from "react-icons/fa";

import GoogleButton from "@/components/GoogleButton";

function SignIn() {
	const signIn = useGoogleLogin({
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
				<div className="flex flex-col gap-2">
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
					<Link href="/catalog" className="btn btn-primary w-full mt-4 normal-case text-base">
						Sign in
					</Link>
					<p className="mt-2 text-center">
						New at magic bar?{" "}
						<Link href="/signup" className="text-primary">
							Sign up
						</Link>
					</p>
					<div className="divider">OR</div>
					<GoogleButton onClick={signIn} text="Sign in with Google" />
				</div>
			</main>
		</div>
	);
}

export default SignIn;
