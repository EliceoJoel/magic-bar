interface ITextInput {
	id: string;
	type?: "text" | "password" | "email";
	placeholder?: string | undefined;
}

function TextInput({ id, type = "text", placeholder = "" }: ITextInput) {
	return (
		<input
			autoComplete="off"
			className="border border-gray-300 outline-none p-2 rounded focus:border-[#597EF7] hover:border-[#597EF7] mb-4 w-full"
			id={id}
			type={type}
			placeholder={placeholder}
		/>
	);
}

export default TextInput;
