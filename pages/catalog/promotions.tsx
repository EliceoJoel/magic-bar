import Image from "next/image";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";

import { promotions } from "data/test";
import { useCartStore } from "@/store/cartStore";

function Promotions() {
	const addProductToCart = useCartStore((store) => store.add);

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Promotions</h1>
				<button className="btn btn-primary btn-sm normal-case md:btn-md">New promotion</button>
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="search"
							placeholder="Search in promotions..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{promotions.map((promotion, index) => (
					<div className="card card-compact bg-base-100 shadow-xl" key={index}>
						<figure className="relative">
							<Image
								alt={promotion.name}
								src={promotion.image}
								width={1000}
								height={1000}
							/>
							<button
								className="btn btn-circle btn-primary absolute top-2 right-2"
								onClick={() => addProductToCart(promotion)}
							>
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">{promotion.additional}</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">{promotion.name}</h2>
							<p className="font-semibold text-primary">
								{promotion.promotialPrice ? promotion.promotialPrice + " Bs." : promotion.price + " Bs."}{" "}
								<del className="text-black">{promotion.promotialPrice ? promotion.price + " Bs." : ""}</del>
							</p>
							<p>{promotion.brand}</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Promotions;
