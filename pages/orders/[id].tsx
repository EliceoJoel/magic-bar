import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import Layout from "@/components/Layout";

import { useUserStore } from "@/store/userStore";
import { isUserClient, orderIsNotEmpty, userIsLogged } from "@/utils/validation";

import productImage from "@/public/beersAndCiders.webp";
import { IOrderFromFirebase } from "@/interfaces/objects";
import { getOrderById } from "@/firebase/orders";
import Loading from "@/components/Loading";
import { emptyOrder } from "@/constants/all";
import NoData from "@/components/NoData";
import { noDataOrderMessage } from "@/constants/text";
import { isNotBlank } from "@/utils/StringUtils";

function Order() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [order, setOrder] = useState<IOrderFromFirebase>(emptyOrder);

	const router = useRouter();
	const orderId: string = router.query.id?.toString?.() ?? "";

	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		const getOrderFromFirebase = async () => {
			const data = await getOrderById(orderId);
			setOrder(data);
			setIsContentLoading(false);
		};

		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged)) {
			router.push("/catalog");
		} else {
			getOrderFromFirebase();
		}
	}, [orderId, router, userLogged]);

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Order details</h1>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{orderIsNotEmpty(order) ? (
						<div>
							<div>
								<span className="font-bold">Id: </span>
								<span>{order.id}</span>
							</div>
							<div>
								<span className="font-bold">Status: </span>
								<span>{order.status}</span>
							</div>
							<div>
								<span className="font-bold">Table number: </span>
								<span>{order.tableNumber}</span>
							</div>
							<div>
								<span className="font-bold">Total price: </span>
								<span>Bs {order.totalprice.toFixed(2)}</span>
							</div>
							<div>
								<span className="font-bold">Order date: </span>
								<span>{new Date(order.createdAt.seconds * 1000).toString()}</span>
							</div>
							<div>
								<span className="font-bold">User details: </span>
								<p>{isNotBlank(order.details) ? order.details : "No details"}</p>
							</div>
							<div>
								<span className="font-bold">Products: </span>
								<div className="overflow-x-auto w-full">
									<table className="table w-full">
										<thead>
											<tr>
												<th>Image</th>
												<th>Name</th>
												<th>Quantity</th>
												<th>Unit price</th>
											</tr>
										</thead>
										<tbody>
											{order.products.map((product, index) => (
												<tr key={index}>
													<td>
														<div className="flex items-center space-x-3">
															<div className="avatar">
																<div className="mask mask-squircle w-12 h-12">
																	<Image
																		src={product.image}
																		alt={product.name + " Image"}
																		width={1000}
																		height={1000}
																	/>
																</div>
															</div>
														</div>
													</td>
													<td>{product.name}</td>
													<td>{product.quantity}</td>
													<td>Bs {product.price.toFixed(2)}</td>
												</tr>
											))}
										</tbody>
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
					) : (
						<NoData message={noDataOrderMessage} />
					)}
				</>
			)}
		</Layout>
	);
}

export default Order;
