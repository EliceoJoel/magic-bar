import Link from "next/link";
import Image from "next/image";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import FormGroup from "../components/common/FormGroup";
import { FaCocktail } from "react-icons/fa";
import registerImage from "../public/registerImage.svg";

function Register() {
	return (
		<div className="h-screen lg:flex">
			<div className="hidden lg:block w-3/6 p-28">
				<Image
					className="w-full h-full"
					src={registerImage}
					alt="login banner"
				/>
			</div>
			<div className="h-screen p-10 h-md:flex h-md:flex-col h-md:justify-center overflow-x-auto lg:w-3/6 lg:px-28 2xl:px-40">
				<div className="text-center text-5xl pb-4 text-[#597EF7] ">
					<FaCocktail className="inline"/>
				</div>
				<h1 className="text-3xl text-center font-bold text-[#597EF7] pb-8 lg:text-4xl lg:pb-10">
					Create an account
				</h1>
				<p>
					Get ready for the best experience where you can enjoy with your
					friends
				</p>
				<form className="flex flex-col py-4">
					<div className="xl:flex justify-between gap-5">
						<FormGroup labelFor="name" textLabel="Name">
							<TextInput id="name" />
						</FormGroup>
						<FormGroup labelFor="lastanme" textLabel="Last name">
							<TextInput id="lastname" />
						</FormGroup>
					</div>
					<FormGroup labelFor="email" textLabel="Email">
						<TextInput
							id="email"
							type="email"
							placeholder="name@gmail.com"
						/>
					</FormGroup>
					<FormGroup labelFor="password" textLabel="Password">
						<TextInput
							id="password"
							type="password"
							placeholder="6+ Characters, 1 Capital letter"
						/>
					</FormGroup>
					<FormGroup
						labelFor="confirmPassword"
						textLabel="Confirm password"
					>
						<TextInput
							id="confirmPassword"
							type="password"
							placeholder="Repeat your password"
						/>
					</FormGroup>
					<Button type="submit" text="Sign up" />
				</form>
				<p>
					Do you already have an account?&nbsp;
					<Link className="text-[#597EF7] font-bold" href="/login">
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
