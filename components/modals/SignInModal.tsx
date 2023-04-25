import Link from "next/link";

function SignInModal() {
	return (
		<>
			<input type="checkbox" id="signInModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label
						htmlFor="signInModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">Sign in</h3>
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
						<Link href="/catalog" className="btn btn-primary w-full mt-4">
							Login
						</Link>
						<p className="mt-2">New at magic bar? open Sign up form</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignInModal;
