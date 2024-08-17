import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';

const Header = () => {
    const { isSignedIn } = useAuth();

    return (
        <header className="header">
            <div className="logo">Flashcard SaaS</div>
            <div className="auth-buttons">
                {!isSignedIn ? (
                    <>
                        <SignInButton mode="modal">
                            <button className="auth-button">Login</button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="auth-button">Sign Up</button>
                        </SignUpButton>
                    </>
                ) : (
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonTrigger: {
                                    padding: '0',
                                    background: 'transparent',
                                    border: 'none',
                                    boxShadow: 'none',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    overflow: 'hidden'
                                },
                                userButtonAvatarBox: {
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
