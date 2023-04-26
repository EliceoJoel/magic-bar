import { FcGoogle } from "react-icons/fc";

interface IGoogleButton {
   onClick: Function;
   text: string;
}

function GoogleButton({ onClick, text }: IGoogleButton) {
	return (
		<button className="btn btn-outline relative normal-case text-base" onClick={() => onClick()}>
			<FcGoogle className="h-6 w-6 absolute left-4" />
			<span className="ml-4 ssm:ml-0">{text}</span>
		</button>
	);
}

export default GoogleButton;
