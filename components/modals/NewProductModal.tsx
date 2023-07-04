import { useState } from "react";
import { useForm } from "react-hook-form";

import { FiInfo } from "react-icons/fi";

import { productCategories } from "@/data/product";
import { newProductSchema, getYupSchema } from "@/yup/schemas";
import { createNewProduct } from "@/firebase/product";
import { INewProductInputs } from "@/interfaces/forms";

function NewProductModal() {
	const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<INewProductInputs>(getYupSchema(newProductSchema));

	const handleCreateNewProduct = handleSubmit(async (data) => {
		// Set loading as started
		setIsCreatingNewProduct(true);

		// Create new product in firebase
		await createNewProduct({
			...data,
			promotionPrice: data.promotionPrice !== undefined ? data.promotionPrice : 0,
			image: data.image[0],
			createdAt: new Date(),
		});

		// Close modal and reset inputs
		document.getElementById("newProductModal")?.click();
		reset();

		// Set loading as finished
		setIsCreatingNewProduct(false);

		// Show a success alert message
	});

	return (
		<>
			<input type="checkbox" id="newProductModal" className="modal-toggle" />
			<div className="modal">
				<form className="modal-box relative max-w-md" onSubmit={handleCreateNewProduct}>
					<label
						htmlFor="newProductModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => reset()}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">New Product</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol <span className="text-red-500">[*]</span> need to be filled because
								they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label htmlFor="productNameInput" className="label justify-start">
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="productNameInput"
								type="text"
								placeholder="Type the name of the product"
								className="input input-bordered input-primary w-full"
								{...register("name")}
							/>
							{errors.name && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.name.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="productBrandInput" className="label justify-start">
								<span className="label-text">Brand</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="productBrandInput"
								type="text"
								placeholder="Type the brand of the product"
								className="input input-bordered input-primary w-full"
								{...register("brand")}
							/>
							{errors.brand && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.brand.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="productCategorySelect" className="label justify-start">
								<span className="label-text">Category</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<select
								id="productCategorySelect"
								className="select select-primary text-base font-normal w-full"
								defaultValue=""
								{...register("category")}
							>
								<option value="" disabled>
									Pick a category for this product
								</option>
								{productCategories.map((category, index) => (
									<option value={category.id} key={index}>
										{category.name}
									</option>
								))}
							</select>
							{errors.category && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.category.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="productPriceInput" className="label justify-start">
								<span className="label-text">Price</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="productPriceInput"
								type="number"
								step={0.01}
								placeholder="Type the base price of the product"
								className="input input-bordered input-primary w-full"
								{...register("price")}
							/>
							{errors.price && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.price.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="productImageFile" className="label justify-start">
								<span className="label-text">Image</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								id="productImageFile"
								accept="image/png, image/jpeg, image/jpg, image/svg, image/webp"
								type="file"
								className="file-input file-input-bordered file-input-primary w-full"
								{...register("image")}
							/>
							{errors.image && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.image.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="productAdditionalInput" className="label">
								<span className="label-text">Additional</span>
							</label>
							<input
								autoComplete="off"
								id="productAdditionalInput"
								type="text"
								placeholder="Amount in mililiters, alcohol percentage, etc.."
								className="input input-bordered input-primary w-full"
								{...register("additional")}
							/>
						</div>
						<div className="bg-primary p-2 rounded-lg text-white flex mt-4 items-center gap-2">
							<FiInfo className="h-8 w-8" />
							<span>If you want to make this product as promotion fill the input below.</span>
						</div>
						<div className="form-control w-full">
							<label htmlFor="productPromotionPriceInput" className="label justify-start">
								<span className="label-text">Promotion price</span>
							</label>
							<input
								autoComplete="off"
								id="productPromotionPriceInput"
								type="number"
								step={0.01}
								placeholder="Type the promotion price of the product"
								className="input input-bordered input-primary w-full"
								{...register("promotionPrice")}
							/>
							{errors.promotionPrice && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.promotionPrice.message}
								</span>
							)}
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="newProductModal" className="btn capitalize" onClick={() => reset()}>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isCreatingNewProduct && "loading"}`}>
							{isCreatingNewProduct ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default NewProductModal;
