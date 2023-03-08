import Layout from "@/components/Layout";
import React from "react";
import CocaColaImage from "@/public/cocacola.jpg";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

const products = [
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},

	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
		brand: "The coca cola company",
		additional: "2 Liters",
	},
	{
		name: "Coca cola zero",
		price: 10,
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
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{products.map((product) => (
					<div className="card card-compact bg-base-100 shadow-xl" key={product.name}>
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
							<p className="font-semibold">{product.price} Bs.</p>
							<p>{product.brand}</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Promotions;
