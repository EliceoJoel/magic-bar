import Image from "next/image";
import Link from "next/link";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { HiOutlineSparkles } from "react-icons/hi";
import { GiWineBottle } from "react-icons/gi";
import { IoDiceOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

import Layout from "@/components/Layout";
import NewProductModal from "@/components/modals/NewProductModal";

import { promotions, combos, games, categories } from "data/test";
import { useCartStore } from "@/store/cartStore";

const SeeAll = ({ title, icon }: { title: string; icon: JSX.Element }) => (
	<Link
		href={"/catalog/" + title.toLowerCase()}
		className="card bg-base-100 card-compact shadow-xl text-primary items-center justify-center gap-4"
	>
		{icon}
		<span className="text-center">See all {title}</span>
	</Link>
);

function AllCatalog() {
	const addProductToCart = useCartStore((store) => store.add);
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">All Catalog</h1>
				<label htmlFor="newProductModal" className="btn btn-primary btn-sm md:btn-md normal-case">
					New product
				</label>
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
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Promotions</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{promotions.slice(0, 5).map((promotion, index) => (
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
									onClick={() => addProductToCart(promotion)}
								>
									<AiOutlinePlus className="w-6 h-6" />
								</button>
								<div className="badge badge-sm absolute bottom-2 right-2">{promotion.additional}</div>
							</figure>
							<div className="card-body gap-0">
								<h3 className="card-title text-base">{promotion.name}</h3>
								<p className="font-bold text-primary">
									Bs {promotion.price.toFixed(2)}&nbsp;
									<del className="text-gray-500 font-semibold text-xs">
										Bs {promotion.normalPrice.toFixed(2)}
									</del>
								</p>
								<p>{promotion.brand}</p>
							</div>
						</div>
					))}
					{promotions.length > 5 && (
						<SeeAll title="promotions" icon={<HiOutlineSparkles className="h-16 w-16" />} />
					)}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Combos</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{combos.slice(0, 5).map((combo, index) => (
						<div className="card card-compact bg-base-100 shadow-xl" key={index}>
							<figure>
								<Image className="w-[500px]" alt={combo.name} src={combo.image} width={1000} height={1000} />
								<button
									className="btn btn-circle btn-primary absolute top-2 right-2"
									onClick={() => addProductToCart(combo)}
								>
									<AiOutlinePlus className="w-6 h-6" />
								</button>
							</figure>
							<div className="card-body gap-0">
								<h3 className="card-title text-base">{combo.name}</h3>
								<p className="font-bold text-primary">
									Bs {combo.price.toFixed(2)}&nbsp;
									<del className="text-gray-500 font-semibold text-xs">Bs {combo.normalPrice.toFixed(2)}</del>
								</p>
							</div>
						</div>
					))}
					{combos.length > 5 && <SeeAll title="combos" icon={<GiWineBottle className="h-16 w-16" />} />}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Games</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{games.slice(0, 5).map((game, index) => (
						<div className="card card-compact bg-base-100 shadow-xl" key={index}>
							<figure className="relative">
								<Image className="w-[500px]" alt={game.name} src={game.image} width={1000} height={1000} />
								<button
									className="btn btn-circle btn-primary absolute top-2 right-2"
									onClick={() => addProductToCart(game)}
								>
									<AiOutlinePlus className="w-6 h-6" />
								</button>
							</figure>
							<div className="card-body gap-0">
								<h3 className="card-title text-base">{game.name}</h3>
								<p className="font-bold text-primary">
									Bs {game.price.toFixed(2)}
								</p>
							</div>
						</div>
					))}
					{games.length > 5 && <SeeAll title="games" icon={<IoDiceOutline className="h-16 w-16" />} />}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Categories</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{categories.slice(0, 5).map((category, index) => (
						<div
							className="card card-compact bg-base-100 shadow-xl cursor-pointer hover:border-primary hover:border-2"
							key={index}
							tabIndex={0}
						>
							<figure className="relative">
								<Image alt={category.name} src={category.image} />
							</figure>
							<div className="card-body gap-0">
								<h3 className="card-title text-base">{category.name}</h3>
							</div>
						</div>
					))}
					{categories.length > 5 && <SeeAll title="categories" icon={<RxDashboard className="h-16 w-16" />} />}
				</div>
			</div>
			<NewProductModal />
		</Layout>
	);
}

export default AllCatalog;
