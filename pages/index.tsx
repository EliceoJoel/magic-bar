import Link from "next/link";
import Image from "next/image";
import { FaCocktail } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import homeImageSrc from "public/home.svg";
import { AiFillFacebook, AiOutlineInstagram } from "react-icons/ai";

const HomeNavbar = () => (
	<div className="navbar">
		<div className="navbar-start">
			<label
				htmlFor="theDrawer"
				tabIndex={0}
				className="btn btn-ghost btn-circle lg:hidden"
			>
				<HiOutlineMenu className="w-6 h-6" />
			</label>
			<Link href="/" className="btn btn-ghost text-xl hidden lg:inline-flex">
				<span className="text-primary p-2">
					<FaCocktail />
				</span>
				<span className="uppercase">Magic Bar</span>
			</Link>
		</div>
		<div className="navbar-center hidden lg:flex">
			<ul className="menu menu-horizontal px-1">
				<li>
					<a>Item 1</a>
				</li>
				<li>
					<a>Item 2</a>
				</li>
				<li>
					<a>Item 3</a>
				</li>
			</ul>
		</div>
		<div className="navbar-end">
			<a className="btn">Get started</a>
		</div>
	</div>
);

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

const LoginModal = () => (
	<>
		<input type="checkbox" id="my-modal" className="modal-toggle" />
		<div className="modal">
			<div className="modal-box">
				<h3 className="font-bold text-lg mb-6">Login</h3>
				<div className="flex flex-col gap-4">
					<div className="text-left">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="text"
							placeholder="Type here"
							className="input input-bordered input-primary w-full max-w-xs"
						/>
					</div>
					<div className="text-left">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="text"
							placeholder="Type here"
							className="input input-bordered input-primary w-full max-w-xs"
						/>
					</div>
				</div>
				<div className="modal-action">
					<label htmlFor="my-modal" className="btn">
						Close
					</label>
					<button className="btn btn-primary">Login</button>
				</div>
			</div>
		</div>
	</>
);

export default function Home() {
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
						htmlFor="my-modal"
						className="btn btn-primary md:btn-wide"
					>
						Start
					</label>
					<LoginModal />
				</div>
			</main>
			<Footer />
		</div>
	);
}
