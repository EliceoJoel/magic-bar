import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import UserModal from "@/components/modals/UserModal";

import { getAllClientOrEmployeUsers } from "@/firebase/authentication";

import { useUserStore } from "@/store/userStore";

import { noDataUsersMessage } from "@/constants/text";
import { emptyUser } from "@/constants/all";

import { IUserFromFirebase } from "@/interfaces/objects";

import { isUserClient, isUserEmployee, userIsLogged } from "@/utils/validation";

function Users() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [users, setUsers] = useState<IUserFromFirebase[]>([]);
	const [selectedUserToEdit, setSelectedUserToEdit] = useState<IUserFromFirebase>(emptyUser);

	const router = useRouter();
	const userLogged = useUserStore((state) => state.user);

	useEffect(() => {
		const getAllClientAndEmployeeUsersFromFirebase = async () => {
			const data = await getAllClientOrEmployeUsers();
			setUsers(data);
			setIsContentLoading(false);
		};

		// Protecting route
		if (!userIsLogged(userLogged) || isUserClient(userLogged) || isUserEmployee(userLogged)) {
			router.push("/catalog");
		} else {
			getAllClientAndEmployeeUsersFromFirebase();
		}
	}, [router, userLogged]);

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Users</h1>
				<label htmlFor="userModal" className="btn btn-primary btn-sm normal-case md:btn-md">
					New user
				</label>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{users.length > 0 ? (
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Last name</th>
										<th>Role</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, index) => (
										<tr key={index}>
											<td>{user.email}</td>
											<td>{user.name}</td>
											<td>{user.lastName}</td>
											<td>{user.role}</td>
											<td>
												<div className="flex gap-4">
													<label htmlFor="userModal" className="btn btn-sm btn-warning capitalize">
														Edit
													</label>
													<label
														htmlFor="deleteUserConfirmationModal"
														className="btn btn-sm btn-error capitalize"
													>
														Delete
													</label>
												</div>
											</td>
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<th>Email</th>
										<th>Name</th>
										<th>Last name</th>
										<th>Role</th>
										<th>Actions</th>
									</tr>
								</tfoot>
							</table>
						</div>
					) : (
						<NoData message={noDataUsersMessage} />
					)}
				</>
			)}
			<UserModal userToEdit={selectedUserToEdit} changeUserToEdit={setSelectedUserToEdit} updateUsers={setUsers} />
		</Layout>
	);
}

export default Users;
