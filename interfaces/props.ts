import { Dispatch, SetStateAction } from "react";
import { ICatalog, IComboFromFirebase, IGameFromFirebase, IProductFromFirebase } from "./objects";

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
