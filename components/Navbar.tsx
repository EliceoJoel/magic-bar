import Link from "next/link";
import React from "react";
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
	return (
		<div className="navbar bg-base-200 h-16">
			<div className="navbar-start">
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
			<div className="navbar-end">
				<button className="btn btn-circle btn-ghost">
					<HiOutlineMoon className="w-6 h-6" />
				</button>
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
			</div>
		</div>
	);
}

export default Navbar;
