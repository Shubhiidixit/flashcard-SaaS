import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth, SignUpButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const handleGenerateClick = () => {
        if (!isSignedIn) {
            router.push('/sign-in');
        } else {
            router.push('/GenerateFlashcards');
        }
    };

    const handlePaymentRedirect = () => {
        router.push('/payment');
    };

    return (
        <>
            <Header />
            <main className={styles.homeContainer}>
                <div className="hero-text">
                    <h1>Welcome to Flashcard SaaS</h1>
                    <p>Easily generate flashcards from any text and supercharge your learning.</p>
                    {isSignedIn && (
                        <button className="generateButton" onClick={handleGenerateClick}>
                            Generate Flashcards
                        </button>
                    )}
                </div>
            </main>

            <section className="features-section">
                <h2>Explore Our Features</h2>
                <p>Our flashcard tool offers essential features to help you study smarter and more effectively.</p>
                <div className="features-container">
                    <div className="feature">
                        <div className="feature-icon">💡</div>
                        <h3>Quick Flashcard Creation</h3>
                        <p>Instantly create flashcards from any text or document.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">📁</div>
                        <h3>Easy Organization</h3>
                        <p>Organize your flashcards into decks and categories effortlessly.</p>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">⏰</div>
                        <h3>Review Anytime</h3>
                        <p>Access and review your flashcards whenever you need them.</p>
                    </div>
                </div>
            </section>

            <section className="pricing-section">
                <h2>Choose Your Plan</h2>
                <p>Find the plan that best suits your learning needs and budget.</p>
                <div className="pricing-container">
                    <div className="pricing-card">
                        <h3>Free Version</h3>
                        <ul>
                            <li>Generate up to 50 flashcards per month</li>
                            <li>Limited customization options</li>
                            <li>Basic support</li>
                        </ul>
                        <SignUpButton mode="redirect">
                            <button>Get Started for Free</button>
                        </SignUpButton>
                    </div>
                    <div className="pricing-card">
                        <h3>Pro Version</h3>
                        <ul>
                            <li>Unlimited flashcard generation</li>
                            <li>Full customization options</li>
                            <li>Access to new features</li>
                        </ul>
                        <button onClick={handlePaymentRedirect}>
                            Get Pro
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
