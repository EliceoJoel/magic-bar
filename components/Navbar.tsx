import Link from "next/link";

import { FaCocktail } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import {
	HiOutlineMenu,
	HiOutlineUserCircle,
	HiOutlineShoppingBag,
	HiOutlineMoon,
} from "react-icons/hi";

import LeftSidebarMenu from "./LeftSidebarMenu";
import Cart from "./Cart";

interface OpenDrawer {
	openDrawer: Function;
}

function Navbar({ openDrawer }: OpenDrawer) {
	//I will simulate the user login info here for now, it will be replace after.
	const userInfo = { isLogged: false };
	return (
		<div className="navbar bg-base-200 h-16 px-4">
			<div className="navbar-start w-1/6 md:w-1/4">
				<label
					htmlFor="theDrawer"
					tabIndex={0}
					className="btn btn-ghost btn-circle lg:hidden"
					onClick={() =>
						openDrawer({ position: "", content: <LeftSidebarMenu /> })
					}
				>
					<HiOutlineMenu className="w-6 h-6" />
				</label>
				<Link
					href="/"
					className="btn btn-ghost text-xl hidden lg:inline-flex"
				>
					<span className="text-primary p-2">
						<FaCocktail />
					</span>
					<span className="uppercase">Magic Bar</span>
				</Link>
			</div>
			<div className="navbar-end w-5/6 md:w-3/4 gap-2">
				<button className="btn btn-circle btn-ghost">
					<HiOutlineMoon className="w-6 h-6" />
				</button>
				{userInfo.isLogged ? (
					<>
						<label
							htmlFor="theDrawer"
							tabIndex={0}
							className="btn btn-circle btn-ghost relative"
							onClick={() =>
								openDrawer({
									position: "drawer-end",
									content: <Cart />,
								})
							}
						>
							<HiOutlineShoppingBag className="w-6 h-6" />
							<div className="badge badge-primary absolute badge-xs top-2 right-1"></div>
						</label>
						<div className="dropdown dropdown-end dropdown-hover">
							<label tabIndex={0} className="btn btn-ghost btn-circle">
								<div className="indicator">
									<HiOutlineUserCircle className="h-6 w-6" />
								</div>
							</label>
							<ul
								tabIndex={0}
								className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
							>
								<li>
									<a>
										<HiOutlineUserCircle className="w-6 h-6" />
										Profile
									</a>
								</li>
								<li>
									<a>
										<FiSettings className="w-6 h-6" />
										Settings
									</a>
								</li>
								<li>
									<a>
										<FiLogOut className="w-6 h-6" />
										Logout
									</a>
								</li>
							</ul>
						</div>
					</>
				) : (
					<div className="flex gap-2">
						<Link
							href="/signin"
							className="btn btn-primary btn-outline btn-sm normal-case"
						>
							Sign in
						</Link>
						<Link
							href="/signup"
							className="btn btn-outline btn-sm normal-case"
						>
							Sign up
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
