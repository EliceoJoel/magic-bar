import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi";
import { GiWineBottle } from "react-icons/gi";
import { IoDiceOutline } from "react-icons/io5";

import Layout from "@/components/Layout";
import ProductModal from "@/components/modals/ProductModal";
import NoData from "@/components/NoData";
import SeeAllItems from "@/components/SeeAllItems";
import Loading from "@/components/Loading";
import ComboModal from "@/components/modals/ComboModal";
import GameModal from "@/components/modals/GameModal";

import { promotions, combos, games } from "data/test";
import { productCategories } from "data/product";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { getLastNPromotions } from "@/firebase/promotions";
import { getLastNCombos } from "@/firebase/combos";
import { getLastNGames } from "@/firebase/games";
import { ICatalog, IComboFromFirebase, IGameFromFirebase, IProductFromFirebase } from "@/interfaces/objects";
import { isCatalogEmpty, isUserEmployee } from "@/utils/validation";
import { emptyCatalog, emptyCombo, emptyGame, emptyProduct } from "@/constants/all";
import { isNotBlank } from "@/utils/StringUtils";
import { noDataCatalogMessage } from "@/constants/text";

function AllCatalog() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [catalog, setCatalog] = useState<ICatalog>(emptyCatalog);
	const [selectedPromotionToEdit, setSelectedPromotionToEdit] = useState<IProductFromFirebase>(emptyProduct);
	const [selectedComboToEdit, setSelectedComboToEdit] = useState<IComboFromFirebase>(emptyCombo);
	const [selectedGameToEdit, setSelectedGameToEdit] = useState<IGameFromFirebase>(emptyGame);

	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		async function getLastFiveProductsFromFirestore() {
			const lastFivePromotions = await getLastNPromotions(5);
			const lastFiveCombos = await getLastNCombos(5);
			const lastFiveGames = await getLastNGames(5);
			if (lastFivePromotions !== undefined && lastFiveCombos !== undefined && lastFiveGames !== undefined) {
				setCatalog({
					promotions: lastFivePromotions,
					combos: lastFiveCombos,
					games: lastFiveGames,
				});
			}
			setIsContentLoading(false);
		}
		getLastFiveProductsFromFirestore();
	}, []);

	const addProductToCart = useCartStore((store) => store.add);

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">All Catalog</h1>
				{isUserEmployee(userLogged) && (
					<label htmlFor="productModal" className="btn btn-primary btn-sm md:btn-md normal-case">
						New product
					</label>
				)}
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="search"
							placeholder="Search in catalog..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			{/* Display categories only for devices with width display higher than 768px */}
			<div className="mb-4 hidden md:block">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Categories</h2>
				</div>
				<div className="grid gap-4 md:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-12">
					{productCategories.map((category, index) => (
						<Link
							className="card card-compact bg-base-100 shadow-xl"
							key={index}
							href={`/catalog/categories/${category.id}`}
							tabIndex={0}
						>
							<figure className="relative">
								<Image alt={category.name} src={category.image} />
							</figure>
							<div className="card-body gap-0 items-center">
								<h3 className="card-title text-base">{category.name}</h3>
							</div>
						</Link>
					))}
				</div>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{isCatalogEmpty(catalog) ? (
						<NoData message={noDataCatalogMessage} />
					) : (
						<>
							{catalog.promotions.length > 0 && (
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<h2 className="text-xl lg:text-2xl">Promotions</h2>
									</div>
									<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
										{catalog?.promotions.map((promotion, index) => (
											<div className="card card-compact bg-base-100 shadow-xl" key={index}>
												<figure className="relative">
													<Image
														className="w-[500px]"
														alt={promotion.name}
														src={promotion.image}
														width={1000}
														height={1000}
													/>
													{isUserEmployee(userLogged) && (
														<button
															className="btn btn-circle btn-primary absolute top-2 right-2"
															onClick={() =>
																addProductToCart({
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
														<div className="badge badge-sm absolute bottom-2 right-2">
															{promotion.additional}
														</div>
													)}
												</figure>
												<div className="card-body gap-0">
													{isUserEmployee(userLogged) ? (
														<label
															htmlFor="productModal"
															className="card-title text-base cursor-pointer"
															tabIndex={0}
															onClick={() => setSelectedPromotionToEdit(promotion)}
														>
															&#9998; {promotion.name}
														</label>
													) : (
														<h3 className="card-title text-base">{promotion.name}</h3>
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
										{promotions.length === 5 && (
											<SeeAllItems title="promotions" icon={<HiOutlineSparkles className="h-16 w-16" />} />
										)}
									</div>
								</div>
							)}
							{catalog.combos.length > 0 && (
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<h2 className="text-xl lg:text-2xl">Combos</h2>
									</div>
									<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
										{catalog?.combos.map((combo, index) => (
											<div className="card card-compact bg-base-100 shadow-xl" key={index}>
												<figure>
													<Image
														className="w-[500px]"
														alt={combo.name}
														src={combo.image}
														width={1000}
														height={1000}
													/>
													{isUserEmployee(userLogged) && (
														<button
															className="btn btn-circle btn-primary absolute top-2 right-2"
															onClick={() => addProductToCart({ ...combo, quantity: 1 })}
														>
															<AiOutlinePlus className="w-6 h-6" />
														</button>
													)}
												</figure>
												<div className="card-body gap-0">
													{isUserEmployee(userLogged) ? (
														<label
															htmlFor="comboModal"
															className="card-title text-base cursor-pointer"
															tabIndex={0}
															onClick={() => setSelectedComboToEdit(combo)}
														>
															&#9998; {combo.name}
														</label>
													) : (
														<h3 className="card-title text-base">{combo.name}</h3>
													)}
													<p className="font-bold text-primary">
														Bs {combo.price.toFixed(2)}&nbsp;
														<del className="text-gray-500 font-semibold text-xs">
															Bs {combo.normalPrice.toFixed(2)}
														</del>
													</p>
												</div>
											</div>
										))}
										{combos.length === 5 && (
											<SeeAllItems title="combos" icon={<GiWineBottle className="h-16 w-16" />} />
										)}
									</div>
								</div>
							)}
							{catalog.games.length > 0 && (
								<div className="mb-4">
									<div className="flex items-center justify-between mb-2">
										<h2 className="text-xl lg:text-2xl">Games</h2>
									</div>
									<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
										{catalog?.games.map((game, index) => (
											<div className="card card-compact bg-base-100 shadow-xl" key={index}>
												<figure className="relative">
													<Image
														className="w-[500px]"
														alt={game.name}
														src={game.image}
														width={1000}
														height={1000}
													/>
													{isUserEmployee(userLogged) && (
														<button
															className="btn btn-circle btn-primary absolute top-2 right-2"
															onClick={() => addProductToCart({ ...game, quantity: 1 })}
														>
															<AiOutlinePlus className="w-6 h-6" />
														</button>
													)}
												</figure>
												<div className="card-body gap-0">
													{isUserEmployee(userLogged) ? (
														<label
															htmlFor="gameModal"
															className="card-title text-base cursor-pointer"
															tabIndex={0}
															onClick={() => setSelectedGameToEdit(game)}
														>
															&#9998; {game.name}
														</label>
													) : (
														<h3 className="card-title text-base">{game.name}</h3>
													)}
													<p className="font-bold text-primary">Bs {game.price.toFixed(2)}</p>
												</div>
											</div>
										))}
										{games.length === 5 && (
											<SeeAllItems title="games" icon={<IoDiceOutline className="h-16 w-16" />} />
										)}
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
			<ProductModal
				productToEdit={selectedPromotionToEdit}
				changeProductToEdit={setSelectedPromotionToEdit}
				updateProducts={null}
				updateCatalogPromotions={setCatalog}
				catalogData={catalog}
				productIsPromotion={true}
			/>
			<ComboModal
				comboToEdit={selectedComboToEdit}
				changeComboToEdit={setSelectedComboToEdit}
				updateCombos={null}
				updateCatalogCombos={setCatalog}
				catalogData={catalog}
			/>
			<GameModal
				gameToEdit={selectedGameToEdit}
				changeGameToEdit={setSelectedGameToEdit}
				updateGames={null}
				updateCatalogGames={setCatalog}
				catalogData={catalog}
			/>
		</Layout>
	);
}

export default AllCatalog;
