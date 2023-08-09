import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "@/components/Layout";

import { useUserStore } from "@/store/userStore";
import { isUserClient, userIsLogged } from "@/utils/validation";

import productImage from "@/public/beersAndCiders.webp";

function Order() {
	const router = useRouter();
	const orderId = router.query.id;

	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged)) {
			router.push("/catalog");
		}
	}, [router, userLogged]);

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Order details</h1>
			</div>
			<div>
				<div>
					<span className="font-bold">Id: </span>
					<span>{orderId}</span>
				</div>
				<div>
					<span className="font-bold">Status: </span>
					<span>Pending</span>
				</div>
				<div>
					<span className="font-bold">Table number: </span>
					<span>2</span>
				</div>
				<div>
					<span className="font-bold">Total price: </span>
					<span>Bs {Number(110).toFixed(2)}</span>
				</div>
				<div>
					<span className="font-bold">Order date: </span>
					<span>August 8, 2023, 22:10:09 UTC-4</span>
				</div>
				<div>
					<span className="font-bold">User details: </span>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pulvinar imperdiet justo sed
						maximus. Suspendisse id venenatis lectus. Vivamus consectetur risus a vestibulum sodales. Orci varius
						natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam dapibus pulvinar
						sem, quis maximus erat interdum vel. Curabitur at volutpat ipsum, et tristique sem.
					</p>
				</div>
				<div>
					<span className="font-bold">Products: </span>
					<div className="overflow-x-auto w-full">
						<table className="table w-full">
							{/* head */}
							<thead>
								<tr>
									<th>Image</th>
									<th>Name</th>
									<th>Quantity</th>
									<th>Unit price</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<Image src={productImage} alt="product image" />
												</div>
											</div>
										</div>
									</td>
									<td>Ron abuelo añejo + Coca cola 2 litros + Hielo test</td>
									<td>1</td>
									<td>110</td>
								</tr>
								<tr>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<Image src={productImage} alt="product image" />
												</div>
											</div>
										</div>
									</td>
									<td>Ron abuelo añejo + Coca cola 2 litros + Hielo test</td>
									<td>1</td>
									<td>110</td>
								</tr>
								<tr>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<Image src={productImage} alt="product image" />
												</div>
											</div>
										</div>
									</td>
									<td>Ron abuelo añejo + Coca cola 2 litros + Hielo test</td>
									<td>1</td>
									<td>110</td>
								</tr>
								<tr>
									<td>
										<div className="flex items-center space-x-3">
											<div className="avatar">
												<div className="mask mask-squircle w-12 h-12">
													<Image src={productImage} alt="product image" />
												</div>
											</div>
										</div>
									</td>
									<td>Ron abuelo añejo + Coca cola 2 litros + Hielo test</td>
									<td>1</td>
									<td>110</td>
								</tr>
							</tbody>
							{/* foot */}
							<tfoot>
								<tr>
									<th>Image</th>
									<th>Name</th>
									<th>Quantity</th>
									<th>Unit price</th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default Order;
