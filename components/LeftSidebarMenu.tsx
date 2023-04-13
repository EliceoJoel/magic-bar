import Link from "next/link";
import React from "react";
import { FaCocktail } from "react-icons/fa";
import { GiWineBottle } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoCloseOutline, IoDiceOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { BsListStars } from 'react-icons/bs';

function LeftSidebarMenu() {
	return (
		<ul className="menu p-4 w-60 ssm:w-80 bg-base-200">
			<div className="mb-4 flex items-center justify-between lg:hidden">
				<div className="flex items-center text-xl">
					<span className="text-primary p-2">
						<FaCocktail />
					</span>
					<span className="uppercase">Magic Bar</span>
				</div>
				<label htmlFor="theDrawer" className="btn btn-outline btn-circle">
					<IoCloseOutline className="h-6 w-6" />
				</label>
			</div>
			<li className="bg-white rounded-btn mb-4 shadow-lg">
				<Link href="/catalog">
					<BsListStars className="h-6 w-6" />
					All catalog
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-4 shadow-lg">
				<Link href="/catalog/promotions">
					<HiOutlineSparkles className="h-6 w-6" />
					Promotions
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-4 shadow-lg">
				<Link href="/catalog/combos">
					<GiWineBottle className="h-6 w-6" />
					Combos
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-4 shadow-lg">
				<Link href="/catalog/games">
					<IoDiceOutline className="h-6 w-6" />
					Games
				</Link>
			</li>
			<li className="bg-white rounded-btn mb-4 shadow-lg">
				<Link href="/catalog/categories">
					<RxDashboard className="h-6 w-6" />
					Categories
				</Link>
			</li>
		</ul>
	);
}

export default LeftSidebarMenu;
