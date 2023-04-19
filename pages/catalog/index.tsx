import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import CocaColaImage from "@/public/cocacola.webp";
import { promotions, combos, games, categories } from "data/test";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";
import { IconType } from "react-icons/lib";
import { GiWineBottle } from "react-icons/gi";
import { IoDiceOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";

const NewProductModal = () => (
	<>
		<input type="checkbox" id="newProductModal" className="modal-toggle" />
		<div className="modal">
			<div className="modal-box relative max-w-md">
				<label
					htmlFor="newProductModal"
					className="btn btn-sm btn-circle absolute right-2 top-2"
					tabIndex={0}
				>
					✕
				</label>
				<h3 className="font-bold text-lg mb-2">New Product</h3>
				<div className="flex flex-col gap-2">
					<div>
						<p>
							Fields that have the symbol{" "}
							<span className="text-red-500">[*]</span> need to be filled
							because they are required
						</p>
					</div>
					<div className="form-control w-full">
						<label
							htmlFor="productNameInput"
							className="label justify-start"
						>
							<span className="label-text">Name</span>
							<span className="label-text text-red-500">&nbsp;[*]</span>
						</label>
						<input
							id="productNameInput"
							type="text"
							placeholder="Type the name of the new product"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label
							htmlFor="productBrandInput"
							className="label justify-start"
						>
							<span className="label-text">Brand</span>
							<span className="label-text text-red-500">&nbsp;[*]</span>
						</label>
						<input
							id="productBrandInput"
							type="text"
							placeholder="Type the brand of the new product"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label
							htmlFor="productCategorySelect"
							className="label justify-start"
						>
							<span className="label-text">Category</span>
							<span className="label-text text-red-500">&nbsp;[*]</span>
						</label>
						<select
							id="productCategorySelect"
							className="select select-primary w-full"
						>
							<option disabled selected>
								Pick a category for this product
							</option>
							{categories.map((category, index) => (
								<option value={category.name} key={index}>
									{category.name}
								</option>
							))}
						</select>
					</div>
					<div className="form-control w-full">
						<label
							htmlFor="productPriceInput"
							className="label justify-start"
						>
							<span className="label-text">Price</span>
							<span className="label-text text-red-500">&nbsp;[*]</span>
						</label>
						<input
							id="productPriceInput"
							type="text"
							placeholder="Type the base price of the new product"
							className="input input-bordered input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label
							htmlFor="productImageFile"
							className="label justify-start"
						>
							<span className="label-text">Image</span>
							<span className="label-text text-red-500">&nbsp;[*]</span>
						</label>
						<input
							id="productImageFile"
							type="file"
							className="file-input file-input-bordered file-input-primary w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label htmlFor="productAdditionalInput" className="label">
							<span className="label-text">Additional</span>
						</label>
						<input
							id="productAdditionalInput"
							type="text"
							placeholder="Amount in mililiters, alcohol percentage, etc.."
							className="input input-bordered input-primary w-full"
						/>
					</div>
				</div>
				<div className="modal-action">
					<label htmlFor="newProductModal" className="btn capitalize">
						Cancel
					</label>
					<button className="btn btn-primary capitalize">Save</button>
				</div>
			</div>
		</div>
	</>
);

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
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">All Catalog</h1>
				<label
					htmlFor="newProductModal"
					className="btn btn-primary btn-sm md:btn-md normal-case"
				>
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
					{promotions.slice(0, 5).map((promotion) => (
						<div
							className="card card-compact bg-base-100 shadow-xl"
							key={promotion.name}
						>
							<figure className="relative">
								<Image alt={promotion.name} src={promotion.image} />
								<button className="btn btn-circle btn-primary absolute top-2 right-2">
									<AiOutlinePlus className="w-6 h-6" />
								</button>
								<div className="badge badge-sm absolute bottom-2 right-2">
									{promotion.additional}
								</div>
							</figure>
							<div className="card-body">
								<h2 className="card-title text-base">
									{promotion.name}
								</h2>
								<p className="font-semibold text-primary">
									{promotion.promotialPrice
										? promotion.promotialPrice + " Bs."
										: promotion.price + " Bs."}{" "}
									<del className="text-black">
										{promotion.promotialPrice
											? promotion.price + " Bs."
											: ""}
									</del>
								</p>
								<p>{promotion.brand}</p>
							</div>
						</div>
					))}
					{promotions.length > 5 && (
						<SeeAll
							title="promotions"
							icon={<HiOutlineSparkles className="h-16 w-16" />}
						/>
					)}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Combos</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{combos.slice(0, 5).map((combo) => (
						<div
							className="card card-compact bg-base-100 shadow-xl"
							key={combo.name}
						>
							<figure>
								<Image alt={combo.name} src={combo.image} />
								<button className="btn btn-circle btn-primary absolute top-2 right-2">
									<AiOutlinePlus className="w-6 h-6" />
								</button>
							</figure>
							<div className="card-body">
								<h2 className="card-title text-base">{combo.name}</h2>
								<p className="font-semibold text-primary">
									{combo.promotialPrice
										? combo.promotialPrice + " Bs."
										: combo.price + " Bs."}{" "}
									<del className="text-black">
										{combo.promotialPrice ? combo.price + " Bs." : ""}
									</del>
								</p>
							</div>
						</div>
					))}
					{combos.length > 5 && (
						<SeeAll
							title="combos"
							icon={<GiWineBottle className="h-16 w-16" />}
						/>
					)}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Games</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{games.slice(0, 5).map((game, index) => (
						<div
							className="card card-compact bg-base-100 shadow-xl"
							key={index}
						>
							<figure className="relative">
								<Image alt={game.name} src={game.image} />
								<button className="btn btn-circle btn-primary absolute top-2 right-2">
									<AiOutlinePlus className="w-6 h-6" />
								</button>
							</figure>
							<div className="card-body">
								<h2 className="card-title text-base">{game.name}</h2>
							</div>
						</div>
					))}
					{games.length > 5 && (
						<SeeAll
							title="games"
							icon={<IoDiceOutline className="h-16 w-16" />}
						/>
					)}
				</div>
			</div>
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-xl lg:text-2xl">Categories</h2>
				</div>
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{categories.slice(0, 5).map((category) => (
						<div
							className="card card-compact bg-base-100 shadow-xl cursor-pointer hover:border-primary hover:border-2"
							key={category.name}
							tabIndex={0}
						>
							<figure className="relative">
								<Image alt={category.name} src={category.image} />
							</figure>
							<div className="card-body">
								<h2 className="card-title text-base">
									{category.name}
								</h2>
							</div>
						</div>
					))}
					{categories.length > 5 && (
						<SeeAll
							title="categories"
							icon={<RxDashboard className="h-16 w-16" />}
						/>
					)}
				</div>
			</div>
			<NewProductModal />
		</Layout>
	);
}

export default AllCatalog;
