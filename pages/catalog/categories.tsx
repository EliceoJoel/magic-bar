import Image from 'next/image';

import { AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";

import { categories } from "data/test";

function Categories() {
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Categories</h1>
				<button className="btn btn-primary btn-sm md:btn-md normal-case">
					New category
				</button>
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="search"
							placeholder="Search in categories..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{categories.map((category, index) => (
					<div
						className="card card-compact bg-base-100 shadow-xl cursor-pointer hover:border-primary hover:border-2"
						key={index}
						tabIndex={0}
					>
						<figure className="relative">
							<Image alt={category.name} src={category.image} />
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">{category.name}</h2>
						</div>
					</div>
				))}
			</div>
		</Layout>
	);
}

export default Categories;
