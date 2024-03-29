import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/router";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";
import ComboModal from "@/components/modals/ComboModal";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";

import { getAllCombos, searchCombos } from "@/firebase/combos";

import { IComboFromFirebase } from "@/interfaces/objects";
import { ISearchInput } from "@/interfaces/forms";

import { emptyCombo } from "@/constants/all";
import { noDataCombosMessage } from "@/constants/text";

import { isUserEmployee, isUserOwner } from "@/utils/validation";
import { isNotBlank } from "@/utils/StringUtils";

import { searchSchema, getYupSchema } from "@/yup/schemas";

function Combos() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [combos, setCombos] = useState<IComboFromFirebase[]>([]);
	const [selectedComboToEdit, setSelectedComboToEdit] = useState<IComboFromFirebase>(emptyCombo);

	const userLogged = useUserStore((state) => state.user);
	const addComboToCart = useCartStore((store) => store.add);

	const router = useRouter();

	const { register, handleSubmit } = useForm<ISearchInput>(getYupSchema(searchSchema));

	useEffect(() => {
		const getAllCombosFromFirebase = async () => {
			const data = await getAllCombos();
			setCombos(data);
			setIsContentLoading(false);
		};
		const getCombosBasedOnSearchText = async (searchText: string) => {
			const data = await searchCombos(searchText);
			setCombos(data);
			setIsContentLoading(false);
		};
		if (router.query.search === undefined) {
			getAllCombosFromFirebase();
		} else {
			getCombosBasedOnSearchText(router.query.search as string);
		}
	}, [router]);

	const handleSearch = handleSubmit(async (data) => {
		setIsContentLoading(true);
		if (isNotBlank(data.search)) {
			router.push({ pathname: "/combos", query: { search: data.search } });
		} else {
			router.push("/combos")
		}
	});

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Combos</h1>
				{(isUserEmployee(userLogged) || isUserOwner(userLogged)) && (
					<label htmlFor="comboModal" className="btn btn-primary btn-sm normal-case md:btn-md">
						New combo
					</label>
				)}
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<form className="input-group input-group-sm md:input-group-md" onSubmit={handleSearch}>
						<input
							autoComplete="off"
							type="search"
							placeholder="Search in combos..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
							{...register("search")}
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md" type="submit">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</form>
				</div>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{combos.length > 0 ? (
						<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
							{combos.map((combo, index) => (
								<div className="card card-compact bg-base-100 shadow-xl" key={index}>
									<figure>
										<Image
											className="w-[500px]"
											alt={combo.name}
											src={combo.image}
											width={1000}
											height={1000}
										/>
										{(isUserEmployee(userLogged) || isUserOwner(userLogged)) && (
											<button
												className="btn btn-circle btn-primary absolute top-2 right-2"
												onClick={() => addComboToCart({ ...combo, quantity: 1 })}
											>
												<AiOutlinePlus className="w-6 h-6" />
											</button>
										)}
									</figure>
									<div className="card-body gap-0">
										{isUserEmployee(userLogged) || isUserOwner(userLogged) ? (
											<label
												htmlFor="comboModal"
												className="card-title text-base cursor-pointer"
												tabIndex={0}
												onClick={() => setSelectedComboToEdit(combo)}
											>
												&#9998; {combo.name}
											</label>
										) : (
											<h2 className="card-title text-base">{combo.name}</h2>
										)}
										<p className="font-bold text-primary">
											Bs {combo.price.toFixed(2)}&nbsp;
											<del className="text-gray-500 font-semibold text-xs">
												Bs {combo.normalPrice.toFixed(2)}
											</del>
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<NoData message={noDataCombosMessage} />
					)}
				</>
			)}
			<ComboModal
				updateCombos={setCombos}
				comboToEdit={selectedComboToEdit}
				changeComboToEdit={setSelectedComboToEdit}
				updateCatalogCombos={null}
				catalogData={null}
			/>
		</Layout>
	);
}

export default Combos;
