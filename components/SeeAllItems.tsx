import Link from "next/link";

function SeeAllItems({ title, icon }: { title: string; icon: JSX.Element }) {
	return (
		<Link
			href={"/catalog/" + title.toLowerCase()}
			className="card bg-base-100 card-compact shadow-xl text-primary items-center justify-center gap-4"
		>
			{icon}
			<span className="text-center">See all {title}</span>
		</Link>
	);
}

export default SeeAllItems;
