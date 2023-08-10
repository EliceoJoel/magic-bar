import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useUserStore } from "@/store/userStore";
import { isUserClient, userIsLogged } from "@/utils/validation";
import { useRouter } from "next/router";
import { IOrderFromFirebase } from "@/interfaces/objects";
import { getAllOrders } from "@/firebase/orders";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import Link from "next/link";
import { noDataOrdersMessage } from "@/constants/text";

function Orders() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [orders, setOrders] = useState<IOrderFromFirebase[]>([]);

	const router = useRouter();
	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		const getAllOrdersFromFirebase = async () => {
			const data = await getAllOrders();
			setOrders(data);
			setIsContentLoading(false);
		};

		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged)) {
			router.push("/catalog");
		} else {
			getAllOrdersFromFirebase();
		}
	}, [router, userLogged]);

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Orders</h1>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{orders.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
									<tr>
										<th>Id</th>
										<th>Status</th>
										<th>Table number</th>
										<th>Total price</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order, index) => (
										<tr key={index}>
											<td>
												<Link href={`/orders/${order.id}`} className="underline hover:text-primary">{order.id}</Link>
											</td>
											<td>{order.status}</td>
											<td>{order.tableNumber}</td>
											<td>{order.totalprice.toFixed(2)}</td>
											<td>
												<div className="flex gap-4">
													<button className="btn btn-sm btn-error capitalize">Cancel</button>
													<button className="btn btn-sm btn-success capitalize">Complete</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<th>Id</th>
										<th>Status</th>
										<th>Table number</th>
										<th>Total price</th>
										<th>Actions</th>
									</tr>
								</tfoot>
							</table>
						</div>
					) : (
						<NoData message={noDataOrdersMessage}/>
					)}
				</>
			)}
		</Layout>
	);
}

export default Orders;
