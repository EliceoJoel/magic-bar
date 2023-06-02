import Image from 'next/image';
import Link from 'next/link';

import Layout from "@/components/Layout";

import { productCategories } from "data/product";

function Categories() {
	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Categories</h1>
			</div>
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{productCategories.map((category, index) => (
					<Link
						className="card card-compact bg-base-100 shadow-xl"
						href={`/catalog/categories/${category.id}`}
						key={index}
						tabIndex={0}
					>
						<figure className="relative">
							<Image alt={category.name} src={category.image} />
						</figure>
						<div className="card-body gap-0">
							<h2 className="card-title text-base">{category.name}</h2>
						</div>
					</Link>
				))}
			</div>
		</Layout>
	);
}

export default Categories;
