import { useEffect } from "react";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useUserStore } from "@/store/userStore";

import "@/styles/globals.css";
import { getItemFromLocalStorage } from "@/utils/localStorage";

export default function App({ Component, pageProps }: AppProps) {
	const googleOAuthID = process.env.GOOGLE_OAUTH_ID ?? "";
	const registerUserInStore = useUserStore((state) => state.registerUser);

	useEffect(() => {
		registerUserInStore(getItemFromLocalStorage("user").state.user);
	}, []);

	return (
		<GoogleOAuthProvider clientId={googleOAuthID}>
			<Component className="bg-base-200" {...pageProps} />
		</GoogleOAuthProvider>
	);
}
