import { useEffect } from "react";
import Layout from "@/components/Layout";
import { useUserStore } from "@/store/userStore";
import { isUserClient, userIsLogged } from "@/utils/validation";
import { useRouter } from "next/router";

function Orders() {
	const router = useRouter();
	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged)) {
			router.push("/catalog");
		}
	}, [router, userLogged]);

	const openOrder = (orderId: string) => {
		router.push(`/orders/${orderId}`);
	};

	return (
		<Layout>
			<div className="mb-4">
				<h1 className="text-xl md:text-2xl">Orders</h1>
			</div>
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
						<tr className="cursor-pointer" onClick={() => openOrder("randomID")}>
							<td>SN3Pemz11zMhlJAweyBX</td>
							<td>Pending</td>
							<td>2</td>
							<td>{Number(110).toFixed(2)}</td>
							<td>
								<div className="flex gap-4">
									<button className="btn btn-sm btn-error capitalize">Cancel</button>
									<button className="btn btn-sm btn-success capitalize">Complete</button>
								</div>
							</td>
						</tr>
						<tr className="cursor-pointer" onClick={() => openOrder("randomID")}>
							<td>SN3Pemz11zMhlJAweyBX</td>
							<td>Pending</td>
							<td>2</td>
							<td>{Number(110).toFixed(2)}</td>
							<td>
								<div className="flex gap-4">
									<button className="btn btn-sm btn-error capitalize">Cancel</button>
									<button className="btn btn-sm btn-success capitalize">Complete</button>
								</div>
							</td>
						</tr>
						<tr className="cursor-pointer" onClick={() => openOrder("randomID")}>
							<td>SN3Pemz11zMhlJAweyBX</td>
							<td>Pending</td>
							<td>2</td>
							<td>{Number(110).toFixed(2)}</td>
							<td>
								<div className="flex gap-4">
									<button className="btn btn-sm btn-error capitalize">Cancel</button>
									<button className="btn btn-sm btn-success capitalize">Complete</button>
								</div>
							</td>
						</tr>
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
		</Layout>
	);
}

export default Orders;
