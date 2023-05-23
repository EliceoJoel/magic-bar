import { validImageExtensions } from "@/constants/all";

export function isValidImageType(file: any) {
	if(file[0] !== undefined) {
		const imageType = file[0].name.toLowerCase().split(".").pop();
		if(imageType !== undefined) {
			return validImageExtensions.includes(imageType);
		}
	}
	return false;
}
