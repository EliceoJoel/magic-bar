import Link from "next/link";
import React from "react";
import { FaCocktail } from "react-icons/fa";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";

function Navbar() {
	return (
		<div className="navbar bg-base-200">
			<div className="navbar-start">
				<label
					htmlFor="leftMenuDrawer"
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
			<div className="navbar-center">
				<Link href="/" className="btn btn-ghost text-xl lg:hidden">
					<span className="text-primary p-2">
						<FaCocktail />
					</span>
					<span className="uppercase">Magic Bar</span>
				</Link>
			</div>
			<div className="navbar-end">
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