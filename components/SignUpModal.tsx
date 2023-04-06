import Link from "next/link";
import React from "react";

function SignUpModal() {
	return (
		<>
			<input type="checkbox" id="signUpModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label
						htmlFor="signUpModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2">Sign up</h3>
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
						<Link href="/catalog" className="btn btn-primary w-full mt-4">
							Sign up
						</Link>
						<p className="mt-2 text-center">
							Do you already have an account? open Sign in form
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignUpModal;
