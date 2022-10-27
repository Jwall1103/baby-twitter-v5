import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";


//react state management
export default function App({
  Component,
  pageProps: { session, ...pageProps},
 }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
    );
}