import Clerk from '../lib/clerk';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <Clerk Component={Component} pageProps={pageProps} />
    );
}

export default MyApp;
