import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	const environment = process.env.NODE_ENV;
	const googleOAuthID =
		environment == "production"
			? process.env.GOOGLE_OAUTH_ID
			: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID;
  console.log(googleOAuthID);
	return (
		<GoogleOAuthProvider clientId={googleOAuthID ?? ""}>
			<Component className="bg-base-200" {...pageProps} />
		</GoogleOAuthProvider>
	);
}
