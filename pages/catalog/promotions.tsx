import { useEffect, useState } from "react";
import Image from "next/image";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";

import { useCartStore } from "@/store/cartStore";
import { IProductFromFirebase } from "@/interfaces/objects";
import { getAllPromotions } from "@/firebase/promotions";

function Promotions() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [promotions, setPromotions] = useState<IProductFromFirebase[]>([]);

	const addPromotionToCart = useCartStore((store) => store.add);

	useEffect(() => {
		const getAllPromotionsFromFirebase = async () => {
			const data = await getAllPromotions();
			if (data !== undefined) {
				setPromotions(data);
			} else {
				setPromotions([]);
			}
			setIsContentLoading(false);
		};
		getAllPromotionsFromFirebase();
	}, []);

	return (
		<Layout>
			<div className="flex mb-4 flex-col sm:flex-row sm:justify-between">
				<h1 className="text-xl mb-4 sm:mb-0 md:text-2xl">Promotions</h1>
				<div className="flex justify-end mb-4">
					<div className="form-control w-full sm:w-[28rem]">
						<div className="input-group input-group-sm md:input-group-md">
							<input
								type="search"
								placeholder="Search in promotions..."
								className="input input-bordered input-sm input-primary w-full sm:max-w-md md:input-md"
							/>
							<button className="btn btn-primary btn-square btn-sm md:btn-md">
								<AiOutlineSearch className="w-6 h-6" />
							</button>
						</div>
					</div>
				</div>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{promotions.length > 0 ? (
						<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
							{promotions.map((promotion, index) => (
								<div className="card card-compact bg-base-100 shadow-xl" key={index}>
									<figure className="relative">
										<Image
											className="w-[500px]"
											alt={promotion.name}
											src={promotion.image}
											width={1000}
											height={1000}
										/>
										<button
											className="btn btn-circle btn-primary absolute top-2 right-2"
											onClick={() => addPromotionToCart(promotion)}
										>
											<AiOutlinePlus className="w-6 h-6" />
										</button>
										{promotion.additional && (
											<div className="badge badge-sm absolute bottom-2 right-2">{promotion.additional}</div>
										)}
									</figure>
									<div className="card-body gap-0">
										<h2 className="card-title text-base">{promotion.name}</h2>
										<p className="font-bold text-primary">
											Bs {promotion.promotionPrice.toFixed(2)}&nbsp;
											<del className="text-gray-500 font-semibold text-xs">
												Bs {promotion.price.toFixed(2)}
											</del>
										</p>
										<p>{promotion.brand}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<NoData />
					)}
				</>
			)}
		</Layout>
	);
}

export default Promotions;
