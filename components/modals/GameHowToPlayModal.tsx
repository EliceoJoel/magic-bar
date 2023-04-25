import { useEffect, useState } from "react";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import YoutubeVideo from "../YoutubeVideo";
import { isNotEmpty } from "@/utils/StringUtils";

interface selectedGame {
	gameName: string;
	videoLink: string;
	pageLink: string;
	showVideo: boolean;
	setShowVideo: Function;
}

function GameHowToPlayModal({
	gameName,
	videoLink,
	pageLink,
	showVideo,
	setShowVideo,
}: selectedGame) {
	const videoId = videoLink.split("?v=")[1];

	return (
		<>
			<input type="checkbox" id="howToPlayModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label
						htmlFor="howToPlayModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
						onClick={() => setShowVideo(false)}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">
						How to play {gameName}
					</h3>
					{showVideo && <YoutubeVideo videoId={videoId} />}
					{isNotEmpty(pageLink) && (
						<Link
							className="text-primary flex items-center justify-center mt-4"
							href={pageLink}
							target="_blank"
						>
							Check how to play step by step&nbsp;
							<FiExternalLink />
						</Link>
					)}
					<div className="modal-action">
						<label
							htmlFor="howToPlayModal"
							className="btn capitalize"
							onClick={() => setShowVideo(false)}
						>
							Cancel
						</label>
						<button className="btn btn-primary capitalize">Save</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default GameHowToPlayModal;
