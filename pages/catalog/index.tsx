import Layout from "@/components/Layout";
import React from "react";

function All() {
	return (
		<Layout>
			<div className="flex flex-col">
				<div className=" flex justify-end">
					<button className="btn btn-sm btn-primary normal-case">
						New product
					</button>
				</div>
				<div>
					<h1 className="text-xl lg:text-2xl">Promotions</h1>
				</div>
				<div>
					<h1 className="text-xl lg:text-2xl">Combos</h1>
				</div>
				<div>
					<h1 className="text-xl lg:text-2xl">Games</h1>
				</div>
				<div>
					<h1 className="text-xl lg:text-2xl">Categories</h1>
				</div>
				<div>
					<h1 className="text-xl lg:text-2xl">Brands</h1>
				</div>
			</div>
		</Layout>
	);
}

export default All;
