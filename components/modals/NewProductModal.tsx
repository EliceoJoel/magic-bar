import { categories } from "@/data/test";

function NewProductModal() {
	return (
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
					<h3 className="font-bold text-lg mb-2 mr-4">New Product</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol{" "}
								<span className="text-red-500">[*]</span> need to be
								filled because they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label
								htmlFor="productNameInput"
								className="label justify-start"
							>
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
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
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
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
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
							</label>
							<select
								id="productCategorySelect"
								className="select select-primary text-base font-normal w-full"
								defaultValue="default"
							>
								<option value="default" disabled>
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
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
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
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
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
}

export default NewProductModal;
