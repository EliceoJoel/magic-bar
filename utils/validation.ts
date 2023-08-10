import { validImageExtensions } from "@/constants/all";
import { UserType } from "@/constants/enums";
import {
	ICatalog,
	IComboFromFirebase,
	IGameFromFirebase,
	IOrderFromFirebase,
	IProductFromFirebase,
	IUser,
} from "@/interfaces/objects";
import { isNotBlank } from "./StringUtils";

export function isValidImageType(fileList: any) {
	if (fileList[0] !== undefined) {
		const imageType = fileList[0].name.toLowerCase().split(".").pop();
		if (imageType !== undefined) {
			return validImageExtensions.includes(imageType);
		}
	}
	return false;
}

export function isValidEditedImageType(fileList: any) {
	if (fileList.length === 0) return true; // No matters if image is undefined since there is an image uploaded, editing information
	const imageType = fileList[0].name.toLowerCase().split(".").pop();
	if (imageType !== undefined) {
		return validImageExtensions.includes(imageType);
	}
}

export function isCatalogEmpty(catalog: ICatalog) {
	return catalog.promotions.length === 0 && catalog.combos.length === 0 && catalog.games.length === 0;
}

export function isUserEmployee(user: IUser) {
	return user !== null && user.role === UserType.EMPLOYEE;
}

export function isUserOwner(user: IUser) {
	return user !== null && user.role === UserType.OWNER;
}

export function isUserClient(user: IUser) {
	return user !== null && user.role === UserType.CLIENT;
}

export function productToEditExist(productToEdit: IProductFromFirebase) {
	return (
		isNotBlank(productToEdit.id) &&
		isNotBlank(productToEdit.name) &&
		isNotBlank(productToEdit.brand) &&
		isNotBlank(productToEdit.category) &&
		isNotBlank(productToEdit.image) &&
		productToEdit.price > 0
	);
}

export function comboToEditExist(comboToEdit: IComboFromFirebase) {
	return (
		isNotBlank(comboToEdit.id) &&
		isNotBlank(comboToEdit.name) &&
		isNotBlank(comboToEdit.image) &&
		comboToEdit.price > 0 &&
		comboToEdit.normalPrice > 0
	);
}

export function gameToEditExist(gameToEdit: IGameFromFirebase) {
	return (
		isNotBlank(gameToEdit.id) && isNotBlank(gameToEdit.name) && isNotBlank(gameToEdit.image) && gameToEdit.price > 0
	);
}

export function orderIsNotEmpty(order: IOrderFromFirebase) {
	return (
		isNotBlank(order.id) &&
		isNotBlank(order.status) &&
		order.tableNumber > 0 &&
		order.totalprice > 0 &&
		order.products.length > 0
	);
}

export function userIsLogged(user: IUser) {
	return isNotBlank(user.email) && isNotBlank(user.lastName) && isNotBlank(user.name) && isNotBlank(user.role);
}
