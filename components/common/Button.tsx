interface IButton {
	type: "button" | "submit" | "reset" | undefined;
	text: string;
}

function Button({ type, text }: IButton) {
	return (
		<button
			className="bg-[#597EF7] outline-none p-2 rounded text-white mt-4 hover:bg-[#85a5ff] focus:outline-[#597EF7] focus:outline-offset-1"
			type={type}
		>
			{text}
		</button>
	);
}

export default Button;
