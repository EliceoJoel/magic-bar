import Link from "next/link";
import Image from "next/image";
import { FaCocktail } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import homeImageSrc from "public/home.svg";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";
import { Dispatch, SetStateAction, useState } from "react";

const Footer = () => (
	<footer className="flex flex-col gap-4 p-4 bg-base-200 items-center">
		<div className="flex gap-4">
			<FaCocktail className="h-6 w-6" />
			<p>Copyright MagicBar © 2023 - All right reserved</p>
		</div>
		<div className="flex gap-4">
			<Link href="/">
				<AiOutlineInstagram className="h-6 w-6" />
			</Link>
			<Link href="/">
				<AiFillFacebook className="h-6 w-6" />
			</Link>
		</div>
	</footer>
);

const LoginForm = ({
	changeRegister,
}: {
	changeRegister: Dispatch<SetStateAction<boolean>>;
}) => (
	<>
		<h3 className="font-bold text-lg mb-2">Login</h3>
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
			<Link href="/catalog" className="btn btn-primary w-full mt-4">Login</Link>
			<div className="mt-2">
				<p>Do not you have an account yet?</p>
				<span
					className="text-primary cursor-pointer"
					tabIndex={0}
					onClick={() => changeRegister(true)}
				>
					Sign up
				</span>
			</div>
		</div>
	</>
);

const RegisterForm = ({
	changeRegister,
}: {
	changeRegister: Dispatch<SetStateAction<boolean>>;
}) => (
	<>
		<h3 className="font-bold text-lg mb-2">Create an account</h3>
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
			<Link href="/catalog" className="btn btn-primary w-full mt-4">Register</Link>
			<div className="mt-2">
				<p>Do you already have an account?</p>
				<span
					className="text-primary cursor-pointer"
					tabIndex={0}
					onClick={() => changeRegister(false)}
				>
					Log in
				</span>
			</div>
		</div>
	</>
);

const LoginRegisterModal = ({
	isRegistering,
	changeRegister,
}: {
	isRegistering: boolean;
	changeRegister: Dispatch<SetStateAction<boolean>>;
}) => (
	<>
		<input
			type="checkbox"
			id={isRegistering ? "registerModal" : "loginModal"}
			className="modal-toggle"
		/>
		<div className="modal">
			<div className="modal-box relative max-w-md">
				<label
					htmlFor={isRegistering ? "registerModal" : "loginModal"}
					className="btn btn-sm btn-circle absolute right-2 top-2"
					tabIndex={0}
					onClick={() => changeRegister(false)}
				>
					✕
				</label>
				{isRegistering ? (
					<RegisterForm changeRegister={changeRegister} />
				) : (
					<LoginForm changeRegister={changeRegister} />
				)}
			</div>
		</div>
	</>
);

export default function Home() {
	const [isRegistering, setIsRegistering] = useState(false);

	return (
		<div className="h-screen bg-base-200">
			<main className="p-4 flex flex-col items-center lg:flex-row lg:h-[calc(100%-96px)]">
				<Image
					className="py-4 m-0 lg:w-1/2 lg:p-4"
					alt="business perspective"
					src={homeImageSrc}
				/>
				<div className="flex flex-col items-center text-center py-4 lg:w-1/2 lg:justify-center lg:mt-0 lg:p-4">
					<div className="flex pt-4 pb-8">
						<span className="text-primary pr-2 ssm:pr-4">
							<FaCocktail className="w-8 h-8 ssm:w-10 ssm:h-10 lg:w-12 lg:h-12" />
						</span>
						<h1 className="text-3xl ssm:text-4xl lg:text-5xl font-bold uppercase">
							Magic Bar
						</h1>
					</div>
					<p className="text-lg ssm:text-xl lg:text-2xl pb-8">
						Have fun with your friends in an incredible place where you
						can enjoy different foods &#127828;, drinks &#127867; and
						games &#127918;
					</p>
					<label
						htmlFor="loginModal"
						className="btn btn-primary md:btn-wide"
					>
						Start
					</label>
					<LoginRegisterModal
						isRegistering={isRegistering}
						changeRegister={setIsRegistering}
					/>
				</div>
			</main>
			<Footer />
		</div>
	);
}
