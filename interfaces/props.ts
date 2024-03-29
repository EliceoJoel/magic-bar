import { Dispatch, SetStateAction } from "react";
import { ICatalog, IComboFromFirebase, IGameFromFirebase, IOrderFromFirebase, IProductFromFirebase, IUserFromFirebase } from "./objects";

export interface IProductModalProps {
	productToEdit: IProductFromFirebase;
	changeProductToEdit: Dispatch<SetStateAction<IProductFromFirebase>>;
	updateProducts: Dispatch<SetStateAction<IProductFromFirebase[]>> | null;
	updateCatalogPromotions: Dispatch<SetStateAction<ICatalog>> | null;
	catalogData: ICatalog | null;
	productIsPromotion: boolean;
}

export interface IComboModalProps {
	comboToEdit: IComboFromFirebase;
	changeComboToEdit: Dispatch<SetStateAction<IComboFromFirebase>>;
	updateCombos: Dispatch<SetStateAction<IComboFromFirebase[]>> | null;
	updateCatalogCombos: Dispatch<SetStateAction<ICatalog>> | null;
	catalogData: ICatalog | null;
}

export interface IGameModalProps {
	gameToEdit: IGameFromFirebase;
	changeGameToEdit: Dispatch<SetStateAction<IGameFromFirebase>>;
	updateGames: Dispatch<SetStateAction<IGameFromFirebase[]>> | null;
	updateCatalogGames: Dispatch<SetStateAction<ICatalog>> | null;
	catalogData: ICatalog | null;
}

export interface INoDataProps {
	message: string;
}

export interface IConfirmationOrderActionModalProps {
	message: string;
	actionType: string;
	orderId: string;
	updateOrders: Dispatch<SetStateAction<IOrderFromFirebase[]>>;
}

export interface IUserModalProps {
	userToEdit: IUserFromFirebase;
	changeUserToEdit: Dispatch<SetStateAction<IUserFromFirebase>>;
	updateUsers: Dispatch<SetStateAction<IUserFromFirebase[]>>;
}

export interface IDeleteUserConfirmationModalProps {
	userId: string;
	updateUsers: Dispatch<SetStateAction<IUserFromFirebase[]>>
}
