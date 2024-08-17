import { ClerkProvider } from '@clerk/nextjs';

const Clerk = ({ Component, pageProps }) => (
    <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
        <Component {...pageProps} />
    </ClerkProvider>
);

export default Clerk;
