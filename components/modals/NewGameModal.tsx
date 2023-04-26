function NewGameModal() {
	return (
		<>
			<input type="checkbox" id="newGameModal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-md">
					<label
						htmlFor="newGameModal"
						className="btn btn-sm btn-circle absolute right-2 top-2"
						tabIndex={0}
					>
						✕
					</label>
					<h3 className="font-bold text-lg mb-2 mr-4">New Game</h3>
					<div className="flex flex-col gap-2">
						<div>
							<p>
								Fields that have the symbol{" "}
								<span className="text-red-500">[*]</span> need to be
								filled because they are required
							</p>
						</div>
						<div className="form-control w-full">
							<label
								htmlFor="gameNameInput"
								className="label justify-start"
							>
								<span className="label-text">Name</span>
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
							</label>
							<input
								id="gameNameInput"
								type="text"
								placeholder="Type the name of the new game"
								className="input input-bordered input-primary w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label
								htmlFor="gameImageFile"
								className="label justify-start"
							>
								<span className="label-text">Image</span>
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
							</label>
							<input
								id="gameImageFile"
								type="file"
								className="file-input file-input-bordered file-input-primary w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label
								htmlFor="gameYouTubeLinkInput"
								className="label justify-start"
							>
								<span className="label-text">
									How to play video link
								</span>
								<span className="label-text text-red-500">
									&nbsp;[*]
								</span>
							</label>
							<input
								id="gameYouTubeLinkInput"
								type="text"
								placeholder="Attach a you tube video link about how to play"
								className="input input-bordered input-primary w-full"
							/>
						</div>
						<div className="form-control w-full">
							<label
								htmlFor="gameHowToPlayLinkInput"
								className="label justify-start"
							>
								<span className="label-text">
									How to play page link
								</span>
							</label>
							<input
								id="gameHowToPlayLinkInput"
								type="text"
								placeholder="Attach a page link about how to play"
								className="input input-bordered input-primary w-full"
							/>
						</div>
					</div>
					<div className="modal-action">
						<label htmlFor="newGameModal" className="btn capitalize">
							Cancel
						</label>
						<button className="btn btn-primary capitalize">Save</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewGameModal;
