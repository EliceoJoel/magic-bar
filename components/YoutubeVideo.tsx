function YoutubeVideo({ videoId }: { videoId: string }) {
	return (
		<div className="overflow-hidden relative h-0 pb-[56.25%]">
			<iframe
            className="left-0 top-0 h-full w-full absolute"
				width="853"
				height="480"
				src={`https://www.youtube.com/embed/${"sWoSZmHsCls"}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	);
}

export default YoutubeVideo;
