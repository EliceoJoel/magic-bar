import { validImageExtensions } from "@/constants/all";
import { ICatalog } from "@/interfaces/objects";

export function isValidImageType(file: any) {
	if (file[0] !== undefined) {
		const imageType = file[0].name.toLowerCase().split(".").pop();
		if (imageType !== undefined) {
			return validImageExtensions.includes(imageType);
		}
	}
	return false;
}

export function isCatalogEmpty(catalog: ICatalog) {
	return catalog.promotions.length === 0 && catalog.combos.length === 0 && catalog.games.length === 0;
}
