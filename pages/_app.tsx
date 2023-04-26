import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	let googleOAuthID = process.env.GOOGLE_OAUTH_ID ?? "";
  if (process.env.NODE_ENV == "development") {
    googleOAuthID = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ID ?? "";
  }
	return (
		<GoogleOAuthProvider clientId={googleOAuthID}>
			<Component className="bg-base-200" {...pageProps} />
		</GoogleOAuthProvider>
	);
}
