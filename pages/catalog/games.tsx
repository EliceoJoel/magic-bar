import { useState } from "react";
import Layout from "@/components/Layout";
import NewGameModal from "@/components/modals/NewGameModal";
import Image from "next/image";
import { games } from "data/test";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import GameHowToPlayModal from "@/components/modals/GameHowToPlayModal";

function Games() {
	const [selectedGame, setSelectedGame] = useState({
		name: "",
		howToPlayYoutubeVideoLink: "",
		howToPlayPageLink: "",
	});
	const [showVideo, setShowVideo] = useState(false);
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">Games</h1>
				<label
					htmlFor="newGameModal"
					className="btn btn-primary btn-sm md:btn-md normal-case"
				>
					New game
				</label>
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
			<div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
				{games.map((game, index) => (
					<div
						className="card card-compact bg-base-100 shadow-xl"
						key={index}
					>
						<figure className="relative">
							<Image alt={game.name} src={game.image} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
						</figure>
						<div className="card-body">
							<label
								className="card-title text-base cursor-pointer hover:text-primary"
								htmlFor="howToPlayModal"
								onClick={() => {
									setSelectedGame(game);
									setShowVideo(true);
								}}
							>
								{game.name}
							</label>
						</div>
					</div>
				))}
			</div>
			<NewGameModal />
			<GameHowToPlayModal
				gameName={selectedGame.name}
				videoLink={selectedGame.howToPlayYoutubeVideoLink}
				pageLink={selectedGame.howToPlayPageLink}
				showVideo={showVideo}
				setShowVideo={setShowVideo}
			/>
		</Layout>
	);
}

export default Games;
