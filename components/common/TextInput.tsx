interface ITextInput {
	id: string;
	type: string;
	placeholder: string;
}

function TextInput({id, type, placeholder}: ITextInput) {
	return (
		<input
			autoComplete="off"
			className="border border-gray-300 outline-none p-2 rounded focus:border-[#597EF7] hover:border-[#597EF7] mb-4"
			id={id}
			type={type}
			placeholder={placeholder}
		/>
	);
}

export default TextInput;
