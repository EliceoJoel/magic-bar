import React from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { productsForCombos } from 'data/test';
import ComboImage from 'public/combo.jpg';

function Combos() {
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl">Combos</h1>
				<button className="btn btn-primary btn-sm normal-case">
					New combo
				</button>
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="text"
							placeholder="Search in combos..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{productsForCombos.map((combo) => (
					<div
						className="card card-compact bg-base-100 shadow-xl"
						key={combo.name}
					>
						<figure>
							<Image alt="coca cola" src={ComboImage} />
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
									{combo.promotialPrice
										? combo.price + " Bs."
										: ""}
								</del>
							</p>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Combos;
