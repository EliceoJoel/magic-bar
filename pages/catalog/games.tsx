import { useEffect, useState } from "react";
import Image from "next/image";

import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

import Layout from "@/components/Layout";
import GameModal from "@/components/modals/GameModal";
import NoData from "@/components/NoData";
import Loading from "@/components/Loading";

import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import { IGameFromFirebase } from "@/interfaces/objects";
import { getAllGames } from "@/firebase/games";
import { userRolHasPermissions } from "@/utils/validation";
import { emptyGame } from "@/constants/all";

function Games() {
	const [isContentLoading, setIsContentLoading] = useState(true);
	const [games, setGames] = useState<IGameFromFirebase[]>([]);
	const [selectedGameToEdit, setSelectedGameToEdit] = useState<IGameFromFirebase>(emptyGame);

	const userLogged = useUserStore((state) => state.user);
	const addGameToCart = useCartStore((store) => store.add);

	useEffect(() => {
		const getAllGamesFromFirebase = async () => {
			const data = await getAllGames();
			setGames(data);
			setIsContentLoading(false);
		};
		getAllGamesFromFirebase();
	}, []);

	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Games</h1>
				{userRolHasPermissions(userLogged) && (
					<label htmlFor="gameModal" className="btn btn-primary btn-sm md:btn-md normal-case">
						New game
					</label>
				)}
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="search"
							placeholder="Search in games..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			{isContentLoading ? (
				<Loading />
			) : (
				<>
					{games.length > 0 ? (
						<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
							{games.map((game, index) => (
								<div className="card card-compact bg-base-100 shadow-xl" key={index}>
									<figure className="relative">
										<Image
											className="w-[500px]"
											alt={game.name}
											src={game.image}
											width={1000}
											height={1000}
										/>
										{userRolHasPermissions(userLogged) && (
											<button
												className="btn btn-circle btn-primary absolute top-2 right-2"
												onClick={() => addGameToCart(game)}
											>
												<AiOutlinePlus className="w-6 h-6" />
											</button>
										)}
									</figure>
									<div className="card-body gap-0">
										{userRolHasPermissions(userLogged) ? (
											<label
												htmlFor="gameModal"
												className="card-title text-base cursor-pointer"
												tabIndex={0}
												onClick={() => setSelectedGameToEdit(game)}
											>
												&#9998; {game.name}
											</label>
										) : (
											<h2 className="card-title text-base">{game.name}</h2>
										)}
										<p className="font-bold text-primary">Bs {game.price.toFixed(2)}</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<NoData />
					)}
				</>
			)}
			<GameModal
				updateGames={setGames}
				gameToEdit={selectedGameToEdit}
				changeGameToEdit={setSelectedGameToEdit}
				updateCatalogGames={null}
				catalogData={null}
			/>
		</Layout>
	);
}

export default Games;
