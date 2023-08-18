import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import ConfirmationOrderActionModal from "@/components/modals/ConfirmationOrderActionModal";

import { getAllOrders, getOrdersByStatus } from "@/firebase/orders";
import { useUserStore } from "@/store/userStore";
import { isUserClient, userIsLogged } from "@/utils/validation";
import { IConfirmationModalvalues, IOrderFromFirebase } from "@/interfaces/objects";

import { noDataOrdersMessage } from "@/constants/text";
import { OrderStatus } from "@/constants/enums";
import { emptyConfirmationModalValues } from "@/constants/all";

function Orders() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [orders, setOrders] = useState<IOrderFromFirebase[]>([]);
	const [confirmModalValues, setConfirmModalvalues] = useState<IConfirmationModalvalues>(emptyConfirmationModalValues);
	const [orderStatusFilterSelected, setOrderStatusFilterSelected] = useState("All");

	const router = useRouter();
	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		const getAllOrdersFromFirebase = async () => {
			const data = await getAllOrders();
			setOrders(data);
			setIsContentLoading(false);
		};

		const getOrdersByStatusFromFirebase = async () => {
			const data = await getOrdersByStatus(router.query.filter as string);
			setOrders(data);
			setIsContentLoading(false);
		};

		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged)) {
			router.push("/catalog");
		} else {
			//Getting data according to filter selected
			if (router.query.filter === "All" || router.query.filter === undefined) {
				getAllOrdersFromFirebase();
				setOrderStatusFilterSelected("All");
			} else {
				getOrdersByStatusFromFirebase();
				setOrderStatusFilterSelected(router.query.filter as string);
			}
		}
	}, [router, userLogged, orderStatusFilterSelected]);

	const getStatusClass = (status: string) => {
		switch (status) {
			case OrderStatus.PENDING:
				return "badge-warning";
			case OrderStatus.COMPLETE:
				return "badge-success";
			case OrderStatus.CANCELED:
				return "badge-error";
			default:
				return "";
		}
	};

	const handleSelectOrderStatusFilter = async (selectedStatusFilter: string) => {
		setIsContentLoading(true);
		router.push({ pathname: "/orders", query: { filter: selectedStatusFilter } });
	};

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Orders</h1>
			</div>
			<div className="btn-group">
				<button
					className={`btn btn-sm ${orderStatusFilterSelected === "All" ? "btn-active" : "btn-outline"} capitalize`}
					onClick={() => handleSelectOrderStatusFilter("All")}
				>
					All
				</button>
				<button
					className={`btn btn-sm ${
						orderStatusFilterSelected === OrderStatus.PENDING ? "btn-active" : "btn-outline"
					} capitalize`}
					onClick={() => handleSelectOrderStatusFilter(OrderStatus.PENDING)}
				>
					Pending
				</button>
				<button
					className={`btn btn-sm ${
						orderStatusFilterSelected === OrderStatus.COMPLETE ? "btn-active" : "btn-outline"
					} capitalize`}
					onClick={() => handleSelectOrderStatusFilter(OrderStatus.COMPLETE)}
				>
					Complete
				</button>
				<button
					className={`btn btn-sm ${
						orderStatusFilterSelected === OrderStatus.CANCELED ? "btn-active" : "btn-outline"
					} capitalize`}
					onClick={() => handleSelectOrderStatusFilter(OrderStatus.CANCELED)}
				>
					Canceled
				</button>
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
												<Link href={`/orders/${order.id}`} className="underline hover:text-primary">
													{order.id}
												</Link>
											</td>
											<td>
												<div className={`badge badge-lg ${getStatusClass(order.status)}`}>
													{order.status}
												</div>
											</td>
											<td>{order.tableNumber}</td>
											<td>{order.totalprice.toFixed(2)}</td>
											<td>
												{order.status === OrderStatus.PENDING && (
													<div className="flex gap-4">
														<label
															htmlFor="confirmationOrderActionModal"
															className="btn btn-sm btn-error capitalize"
															onClick={() => {
																setConfirmModalvalues({
																	orderId: order.id,
																	message: "Do you want to cancel this order?",
																	actionType: OrderStatus.CANCELED,
																});
															}}
														>
															Cancel
														</label>
														<label
															htmlFor="confirmationOrderActionModal"
															className="btn btn-sm btn-success capitalize"
															onClick={() => {
																setConfirmModalvalues({
																	orderId: order.id,
																	message: "Do you want to complete this order?",
																	actionType: OrderStatus.COMPLETE,
																});
															}}
														>
															Complete
														</label>
													</div>
												)}
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
						<NoData message={noDataOrdersMessage} />
					)}
				</>
			)}
			<ConfirmationOrderActionModal {...confirmModalValues} updateOrders={setOrders} />
		</Layout>
	);
}

export default Orders;
