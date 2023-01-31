import Link from "next/link";
import Image from "next/image";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { FaCocktail } from "react-icons/fa";
import loginImage from "../public/loginImage.svg";

function Login() {
	return (
		<div className="h-screen lg:flex">
			<div className="hidden lg:block w-3/6 p-28">
				<Image
					className="w-full h-full"
					src={loginImage}
					alt="login banner"
				/>
			</div>
			<div className="h-screen flex flex-col p-10 justify-center lg:w-3/6 lg:px-28">
				<div className="flex justify-center text-5xl pb-4 text-[#597EF7]">
					<FaCocktail />
				</div>
				<h1 className="text-4xl text-center font-bold text-[#597EF7] pb-8 lg:text-5xl lg:pb-10">
					Welcome to Magic Bar
				</h1>
				<p>A wonderful place where you can enjoy with your friends</p>
				<form className="flex flex-col py-4">
					<label htmlFor="email">Email</label>
					<TextInput
						id="email"
						type="email"
						placeholder="name@gmail.com"
					/>
					<label htmlFor="password">Password</label>
					<TextInput
						id="password"
						type="password"
						placeholder="6+ Characters, 1 Capital letter"
					/>
					<Button type="submit" text="Log in" />
				</form>
				<p>
					Do not you have an account yet?&nbsp;
					<Link className="text-[#597EF7] font-bold" href="/register">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
