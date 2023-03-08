import Layout from "@/components/Layout";
import React from "react";

function Combos() {
	return (
		<Layout>
			<div className="flex justify-between items-center">
				<h1 className="text-xl">Combos</h1>
				<button className="btn btn-primary btn-sm normal-case">
					New combo
				</button>
			</div>
		</Layout>
	);
}

export default Combos;
