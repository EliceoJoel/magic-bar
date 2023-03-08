import Layout from "@/components/Layout";
import React from "react";

function Games() {
	return (
		<Layout>
			<div className="flex justify-between items-center">
				<h1 className="text-xl">Games</h1>
				<button className="btn btn-primary btn-sm normal-case">
					New game
				</button>
			</div>
		</Layout>
	);
}

export default Games;
