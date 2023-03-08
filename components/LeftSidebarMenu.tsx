import Link from "next/link";
import React from "react";
import { GiWineBottle } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoCloseOutline, IoDiceOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbTriangleSquareCircle } from "react-icons/tb";

function LeftSidebarMenu() {
	return (
		<ul className="menu p-4 w-60 ssm:w-80 bg-base-200">
			<div className="mb-3 flex justify-center lg:hidden">
				<label
					htmlFor="leftMenuDrawer"
					className="btn btn-outline btn-circle"
				>
					<IoCloseOutline className="h-6 w-6" />
				</label>
			</div>
			<li className="bg-white rounded-btn mb-3 shadow-lg">
				<Link href="promotions">
					<HiOutlineSparkles className="h-6 w-6" />
					Promotions
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-3 shadow-lg">
				<Link href="combos">
					<GiWineBottle className="h-6 w-6" />
					Combos
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-3 shadow-lg">
				<Link href="games">
					<IoDiceOutline className="h-6 w-6" />
					Games
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-3 shadow-lg">
				<Link href="categories">
					<RxDashboard className="h-6 w-6" />
					Categories
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-3 shadow-lg">
				<Link href="brands">
					<TbTriangleSquareCircle className="h-6 w-6" />
					Brands
				</Link>
			</li>
		</ul>
	);
}

export default LeftSidebarMenu;
