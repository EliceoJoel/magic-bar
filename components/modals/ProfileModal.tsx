import { useUserStore } from "@/store/userStore";

function ProfileModal() {
	const userLogged = useUserStore((state) => state.user);
	return (
		<div>
			<input type="checkbox" id="profileModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">User Profile</h3>
					<div className="py-4">
						<div>
							<span className="font-bold">Name: </span>
							<span>{userLogged.name}</span>
						</div>
						<div>
							<span className="font-bold">Lastname: </span>
							<span>{userLogged.lastName}</span>
						</div>
						<div>
							<span className="font-bold">Email: </span>
							<span>{userLogged.email}</span>
						</div>
						<div>
							<span className="font-bold">Role: </span>
							<span>{userLogged.role}</span>
						</div>
					</div>
					<div className="modal-action m-0">
						<label htmlFor="profileModal" className="btn btn-primary normal-case">
							Close
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileModal;
