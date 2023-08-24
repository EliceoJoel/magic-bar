import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";
import ProductModal from "@/components/modals/ProductModal";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { IProductFromFirebase } from "@/interfaces/objects";
import { getAllPromotions, searchPromotions } from "@/firebase/promotions";
import { isUserEmployee, isUserOwner } from "@/utils/validation";
import { emptyProduct } from "@/constants/all";
import { isNotBlank } from "@/utils/StringUtils";
import { noDataPromotionsMessage } from "@/constants/text";
import { ISearchInput } from "@/interfaces/forms";
import { searchSchema, getYupSchema } from "@/yup/schemas";

function Promotions() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [promotions, setPromotions] = useState<IProductFromFirebase[]>([]);
	const [selectedPromotionToEdit, setSelectedPromotionToEdit] = useState<IProductFromFirebase>(emptyProduct);

	const userLogged = useUserStore((state) => state.user);
	const addPromotionToCart = useCartStore((store) => store.add);

	const router = useRouter();

	const { register, handleSubmit } = useForm<ISearchInput>(getYupSchema(searchSchema));

	useEffect(() => {
		const getAllPromotionsFromFirebase = async () => {
			const data = await getAllPromotions();
			setPromotions(data);
			setIsContentLoading(false);
		};
		const getPromotionsBasedOnSearchText = async (searchText: string) => {
			const data = await searchPromotions(searchText);
			setPromotions(data);
			setIsContentLoading(false);
		};
		if (router.query.search === undefined) {
			getAllPromotionsFromFirebase();
		} else {
			getPromotionsBasedOnSearchText(router.query.search as string);
		}
	}, [router]);

	const handleSearch = handleSubmit(async (data) => {
		setIsContentLoading(true);
		if (isNotBlank(data.search)) {
			router.push({ pathname: "/promotions", query: { search: data.search } });
		} else {
			router.push("/promotions");
		}
	});

	return (
		<Layout>
			<div className="flex mb-4 flex-col sm:flex-row sm:justify-between">
				<h1 className="text-xl mb-4 sm:mb-0 md:text-2xl">Promotions</h1>
				<div className="flex justify-end mb-4">
					<div className="form-control w-full sm:w-[28rem]">
						<form className="input-group input-group-sm md:input-group-md" onSubmit={handleSearch}>
							<input
								autoComplete="off"
								type="search"
								placeholder="Search in promotions..."
								className="input input-bordered input-sm input-primary w-full sm:max-w-md md:input-md"
								{...register("search")}
							/>
							<button className="btn btn-primary btn-square btn-sm md:btn-md" type="submit">
								<AiOutlineSearch className="w-6 h-6" />
							</button>
						</form>
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
										{(isUserEmployee(userLogged) || isUserOwner(userLogged)) && (
											<button
												className="btn btn-circle btn-primary absolute top-2 right-2"
												onClick={() =>
													addPromotionToCart({
														...promotion,
														quantity: 1,
														name: isNotBlank(promotion.additional)
															? promotion.name + " (" + promotion.additional + ")"
															: promotion.name,
													})
												}
											>
												<AiOutlinePlus className="w-6 h-6" />
											</button>
										)}
										{isNotBlank(promotion.additional) && (
											<div className="badge badge-sm absolute bottom-2 right-2">{promotion.additional}</div>
										)}
									</figure>
									<div className="card-body gap-0">
										{isUserEmployee(userLogged) || isUserOwner(userLogged) ? (
											<label
												htmlFor="productModal"
												className="card-title text-base cursor-pointer"
												tabIndex={0}
												onClick={() => setSelectedPromotionToEdit(promotion)}
											>
												&#9998; {promotion.name}
											</label>
										) : (
											<h2 className="card-title text-base">{promotion.name}</h2>
										)}
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
						<NoData message={noDataPromotionsMessage} />
					)}
				</>
			)}
			<ProductModal
				productToEdit={selectedPromotionToEdit}
				changeProductToEdit={setSelectedPromotionToEdit}
				updateProducts={setPromotions}
				updateCatalogPromotions={null}
				catalogData={null}
				productIsPromotion={true}
			/>
		</Layout>
	);
}

export default Promotions;
