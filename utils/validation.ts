import { validImageExtensions } from "@/constants/all";
import { UserType } from "@/constants/userType";
import { INewProductInputs } from "@/interfaces/forms";
import { ICatalog, IComboFromFirebase, IGameFromFirebase, IProductFromFirebase } from "@/interfaces/objects";
import { isNotEmpty } from "./StringUtils";

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

export function userRolHasPermissions(user: any) {
	return user !== null && user.rol === UserType.EMPLOYEE;
}

export function productToEditExist(productToEdit: IProductFromFirebase) {
	return (
		isNotEmpty(productToEdit.id) &&
		isNotEmpty(productToEdit.name) &&
		isNotEmpty(productToEdit.brand) &&
		isNotEmpty(productToEdit.category) &&
		isNotEmpty(productToEdit.image) &&
		productToEdit.price > 0
	);
}

export function comboToEditExist(comboToEdit: IComboFromFirebase) {
	return (
		isNotEmpty(comboToEdit.id) &&
		isNotEmpty(comboToEdit.name) &&
		isNotEmpty(comboToEdit.image) &&
		comboToEdit.price > 0 &&
		comboToEdit.normalPrice > 0
	);
}

export function gameToEditExist(gameToEdit: IGameFromFirebase) {
	return (
		isNotEmpty(gameToEdit.id) && isNotEmpty(gameToEdit.name) && isNotEmpty(gameToEdit.image) && gameToEdit.price > 0
	);
}
