import React from "react";
import {
	HiOutlineUserCircle,
	HiOutlineMenu,
	HiOutlineSparkles,
} from "react-icons/hi";
import { FaCocktail } from "react-icons/fa";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { GiWineBottle } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { IoDiceOutline } from "react-icons/io5";

const NavBar = () => (
	<div className="navbar bg-base-200">
		<div className="navbar-start">
			<label
				htmlFor="my-drawer-3"
				tabIndex={0}
				className="btn btn-ghost btn-circle lg:hidden"
			>
				<HiOutlineMenu className="w-6 h-6" />
			</label>
			<a className="btn btn-ghost normal-case text-xl hidden lg:inline-flex">
				<span className="text-primary p-2">
					<FaCocktail />
				</span>
				<span className="uppercase">Magic Bar</span>
			</a>
		</div>
		<div className="navbar-center">
			<a className="btn btn-ghost normal-case text-xl lg:hidden">
				<span className="text-primary p-2">
					<FaCocktail />
				</span>
				<span className="uppercase">Magic Bar</span>
			</a>
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

function Dashboard() {
	return (
		<div className="h-screen bg-base-200">
			<div className="drawer">
				<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content flex flex-col">
					<NavBar />
				</div>
				<div className="drawer-side">
					<label htmlFor="my-drawer-3" className="drawer-overlay"></label>
					<ul className="menu p-4 w-60 ssm:w-80 bg-base-200">
						<li className="bg-white rounded-btn mb-3">
							<a>
								<HiOutlineSparkles className="h-6 w-6" />
								Promotions
							</a>
						</li>
						<li className="bg-white rounded-btn mb-3">
							<a>
								<GiWineBottle className="h-6 w-6" />
								Combos
							</a>
						</li>
						<li className="bg-white rounded-btn mb-3">
							<a>
								<IoDiceOutline className="h-6 w-6" />
								Games
							</a>
						</li>
						<li className="bg-white rounded-btn mb-3">
							<a>
								<RxDashboard className="h-6 w-6" />
								Categories
							</a>
						</li>
						<li className="bg-white rounded-btn mb-3">
							<a>
								<TbTriangleSquareCircle className="h-6 w-6" />
								Brands
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
