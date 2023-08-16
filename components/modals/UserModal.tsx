import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getAllClientOrEmployeUsers, signUpUser } from "@/firebase/authentication";

import { INewUserInputs } from "@/interfaces/forms";
import { IUserModalProps } from "@/interfaces/props";

import { UserType } from "@/constants/enums";
import { emptyUser } from "@/constants/all";

import { userToEditExist } from "@/utils/validation";

import { getYupSchema, editUserSchema, newUserSchema } from "@/yup/schemas";

function UserModal({ updateUsers, userToEdit, changeUserToEdit }: IUserModalProps) {
	const [isSavingUser, setIsSavingUser] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		setValue,
		formState: { errors },
	} = useForm<INewUserInputs>(
		userToEditExist(userToEdit) ? getYupSchema(editUserSchema) : getYupSchema(newUserSchema)
	);

	useEffect(() => {
		if (userToEditExist(userToEdit)) {
			setValue("name", userToEdit.name);
			setValue("lastName", userToEdit.lastName);
			setValue("role", userToEdit.role);
			setValue("email", userToEdit.email);
		}
	}, [setValue, userToEdit]);

	const handleCreateNewUser = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingUser(true);

		// Sign up new user in firebase
		await signUpUser({
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Update users displayed with the new created
		const clientOrEmployeUsersUpdated = await getAllClientOrEmployeUsers();
		updateUsers(clientOrEmployeUsersUpdated);

		// Close modal and reset inputs
		document.getElementById("userModal")?.click();
		reset();

		//Set loading as finished
		setIsSavingUser(false);

		// Show a success alert message
	});

	const handleEditUser = handleSubmit(async (data) => {
		// Set loading as started
		setIsSavingUser(true);

		// Update user information in firebase
		// await updateUser({
		// 	...data,
		// 	id: gameToEdit.id,
		// 	updatedAt: new Date(),
		// });

		// Update users displayed with the edited user
		const clientOrEmployeUsersUpdated = await getAllClientOrEmployeUsers();
		updateUsers(clientOrEmployeUsersUpdated);

		// Close modal and reset inputs
		document.getElementById("userModal")?.click();
		reset();
		changeUserToEdit(emptyUser);

		//Set loading as finished
		setIsSavingUser(false);

		// Show a success alert message
	});
	return (
		<>
			<input type="checkbox" id="userModal" className="modal-toggle" />
			<div className="modal">
				<form
					className="modal-box relative max-w-md"
					onSubmit={userToEditExist(userToEdit) ? handleEditUser : handleCreateNewUser}
				>
					<label
						htmlFor="userModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => {
							reset();
							changeUserToEdit(emptyUser);
						}}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">{userToEditExist(userToEdit) ? "Edit User" : "New User"}</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol <span className="text-red-500">[*]</span> need to be filled because
								they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label htmlFor="userNameInput" className="label justify-start">
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="userNameInput"
								type="text"
								placeholder="Type the name of the new user"
								className={`input input-bordered input-primary w-full ${errors.name && "input-error"}`}
								{...register("name")}
							/>
							{errors.name && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.name.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="userLastnameInput" className="label justify-start">
								<span className="label-text">Last name</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="userLastnameInput"
								type="text"
								placeholder="Type the last name of the new user"
								className={`input input-bordered input-primary w-full ${errors.lastName && "input-error"}`}
								{...register("lastName")}
							/>
							{errors.lastName && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.lastName.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="userRoleInput" className="label justify-start">
								<span className="label-text">Role</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<select
								id="userRoleInput"
								className={`select select-primary text-base font-normal w-full ${
									errors.role && "select-error"
								}`}
								defaultValue=""
								{...register("role")}
							>
								<option value="" disabled>
									Pick a category for this product
								</option>
								<option value={UserType.CLIENT}>{UserType.CLIENT}</option>
								<option value={UserType.EMPLOYEE}>{UserType.EMPLOYEE}</option>
							</select>
							{errors.role && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.role.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="userEmailInput" className="label justify-start">
								<span className="label-text">Email</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="userEmailInput"
								type="text"
								placeholder="Type the email of the new user"
								className={`input input-bordered input-primary w-full ${errors.email && "input-error"}`}
								{...register("email")}
							/>
							{errors.email && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.email.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="userPasswordInput" className="label justify-start">
								<span className="label-text">Password</span>
								<span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="userPasswordInput"
								type="password"
								placeholder="Type your password, 6+ characters"
								className={`input input-bordered input-primary w-full ${errors.password && "input-error"}`}
								{...register("password")}
							/>
							{errors.password && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.password.message}
								</span>
							)}
						</div>
						<div className="form-control w-full">
							<label htmlFor="userconfirmPasswordInput" className="label justify-start">
								<span className="label-text">Confirm password</span>
                        <span className="label-text text-red-500">&nbsp;[*]</span>
							</label>
							<input
								autoComplete="off"
								id="userconfirmPasswordInput"
								type="password"
								placeholder="Confirm your password"
								className={`input input-bordered input-primary w-full ${
									errors.confirmPassword && "input-error"
								}`}
								{...register("confirmPassword")}
							/>
							{errors.confirmPassword && (
								<span className="text-sm text-error mt-1" role="alert">
									{errors.confirmPassword.message}
								</span>
							)}
						</div>
					</div>
					<div className="modal-action">
						<label
							htmlFor="userModal"
							className="btn capitalize"
							onClick={() => {
								reset();
								changeUserToEdit(emptyUser);
							}}
						>
							Cancel
						</label>
						<button type="submit" className={`btn btn-primary capitalize ${isSavingUser && "loading"}`}>
							{isSavingUser ? "Saving" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default UserModal;
