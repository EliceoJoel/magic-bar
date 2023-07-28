import React, { useEffect, useState } from "react";
import Image from "next/image";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import ProductModal from "@/components/modals/ProductModal";
import NoData from "@/components/NoData";

import { AiOutlinePlus } from "react-icons/ai";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { productCategories } from "@/data/product";
import { getProductsBycategory } from "@/firebase/product";
import { IPath, IProductFromFirebase } from "@/interfaces/objects";
import { isUserEmployee } from "@/utils/validation";
import { emptyProduct } from "@/constants/all";
import { isNotBlank } from "@/utils/StringUtils";

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
	const [selectedProductToEdit, setSelectedProductToEdit] = useState<IProductFromFirebase>(emptyProduct);

	const userLogged = useUserStore((state) => state.user);
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
				<>
					{products.length > 0 ? (
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
										{isUserEmployee(userLogged) && (
											<button
												className="btn btn-circle btn-primary absolute top-2 right-2"
												onClick={() =>
													addProductToCart({
														...product,
														quantity: 1,
														name: isNotBlank(product.additional)
															? product.name + " (" + product.additional + ")"
															: product.name,
													})
												}
											>
												<AiOutlinePlus className="w-6 h-6" />
											</button>
										)}
										{isNotBlank(product.additional) && (
											<div className="badge badge-sm absolute bottom-2 right-2">{product.additional}</div>
										)}
									</figure>
									<div className="card-body gap-0">
										{isUserEmployee(userLogged) ? (
											<label
												htmlFor="productModal"
												className="card-title text-base cursor-pointer"
												tabIndex={0}
												onClick={() => setSelectedProductToEdit(product)}
											>
												&#9998; {product.name}
											</label>
										) : (
											<h2 className="card-title text-base">{product.name}</h2>
										)}
										<p className="font-bold text-primary">Bs {product.price.toFixed(2)}</p>
										<p>{product.brand}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<NoData />
					)}
				</>
			)}
			<ProductModal
				productToEdit={selectedProductToEdit}
				changeProductToEdit={setSelectedProductToEdit}
				updateProducts={setProducts}
				updateCatalogPromotions={null}
				catalogData={null}
				productIsPromotion={false}
			/>
		</Layout>
	);
}

export default Category;
