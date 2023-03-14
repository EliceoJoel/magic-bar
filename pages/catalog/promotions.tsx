import Layout from "@/components/Layout";
import React from "react";
import CocaColaImage from "@/public/cocacola.jpg";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

const products = [
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},

	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 12,
		promotialPrice: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
];

function Promotions() {
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Promotions</h1>
				<button className="btn btn-primary btn-sm md:btn-md normal-case">
					New promotion
				</button>
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="text"
							placeholder="Search…"
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{products.map((product) => (
					<div
						className="card card-compact bg-base-100 shadow-xl"
						key={product.name}
					>
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								{product.additional}
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">{product.name}</h2>
							<p className="font-semibold text-primary">
								{product.promotialPrice
									? product.promotialPrice + " Bs."
									: product.price + " Bs."}{" "}
								<del className="text-black">
									{product.promotialPrice
										? product.price + " Bs."
										: ""}
								</del>
							</p>
							<p>{product.brand}</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Promotions;
