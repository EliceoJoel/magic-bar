import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaCocktail } from "react-icons/fa";
import { GiWineBottle } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import { IoCloseOutline, IoDiceOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BsCardChecklist, BsListStars } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useUserStore } from "@/store/userStore";
import { isUserEmployee, isUserOwner } from "@/utils/validation";
import { catalogRoutes } from "@/constants/all";

function LeftSidebarMenu() {
	const userLogged = useUserStore((store) => store.user);
	const pathname = usePathname();

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
			{catalogRoutes.map((catalogRoute, index) => (
				<li className="rounded-btn mb-4 shadow-lg" key={index}>
					<Link href={catalogRoute.path} className={`${pathname?.includes(catalogRoute.path) ? "active" : "bg-white text-black"}`}>
						<catalogRoute.icon className="h-6 w-6" />
						{catalogRoute.name}
					</Link>
				</li>
			))}
			{(isUserEmployee(userLogged) || isUserOwner(userLogged)) && (
				<li className="bg-white rounded-btn mb-4 shadow-lg">
					<Link href="/orders" className={`${pathname?.includes("/orders")? "active" : "bg-white text-black"}`}>
						<BsCardChecklist className="h-6 w-6" />
						Orders
					</Link>
				</li>
			)}
			{isUserOwner(userLogged) && (
				<li className="bg-white rounded-btn mb-4 shadow-lg">
					<Link href="/users" className={`${pathname?.includes("/users") ? "active" : "bg-white text-black"}`}>
						<FiUsers className="h-6 w-6" />
						Users
					</Link>
				</li>
			)}
		</ul>
	);
}

export default LeftSidebarMenu;
