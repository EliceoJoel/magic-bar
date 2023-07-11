import React, { useEffect, useState } from "react";
import Image from "next/image";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

import { AiOutlinePlus } from "react-icons/ai";

import { productCategories } from "@/data/product";
import { getProductsBycategory } from "@/firebase/product";
import { useCartStore } from "@/store/cartStore";
import { IPath, IProductFromFirebase } from "@/interfaces/objects";

export async function getStaticPaths() {
	const categoriesPaths = productCategories.map((productCategory) => {
		return {
			params: {
				id: productCategory.id,
			},
		};
	});
	return {
		paths: categoriesPaths,
		fallback: false,
	};
}

export async function getStaticProps({ params }: { params: IPath }) {
	return { props: { categoryId: params.id } };
}

function Category({ categoryId }: { categoryId: string }) {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [products, setProducts] = useState<IProductFromFirebase[]>([]);
	const addProductToCart = useCartStore((store) => store.add);
	const pageName = productCategories.find((category) => category.id === categoryId)?.name;

	useEffect(() => {
		const getProductData = async () => {
			const data = await getProductsBycategory(categoryId);
			if (data !== undefined) {
				setProducts(data);
			} else {
				setProducts([]);
			}
			setIsContentLoading(false);
		};

		getProductData();
	}, [categoryId]);

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">{pageName}</h1>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
					{products.map((product, index) => (
						<div className="card card-compact bg-base-100 shadow-xl" key={index}>
							<figure className="relative">
								<Image
									className="w-[500px]"
									alt={product.name}
									src={product.image}
									width={1000}
									height={1000}
								/>
								<button
									className="btn btn-circle btn-primary absolute top-2 right-2"
									onClick={() => addProductToCart(product)}
								>
									<AiOutlinePlus className="w-6 h-6" />
								</button>
								{product.additional && (
									<div className="badge badge-sm absolute bottom-2 right-2">{product.additional}</div>
								)}
							</figure>
							<div className="card-body gap-0">
								<h2 className="card-title text-base">{product.name}</h2>
								<p className="font-bold text-primary">Bs {product.price.toFixed(2)}</p>
								<p>{product.brand}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</Layout>
	);
}

export default Category;
