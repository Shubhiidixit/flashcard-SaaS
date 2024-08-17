import { loadStripe } from '@stripe/stripe-js';
import styles from '../styles/Home.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
    const handlePayment = async () => {
        const stripe = await stripePromise;

        const res = await fetch('/api/stripe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ priceId: 'your_price_id_here' }) // Replace with your actual Price ID
        });

        const { sessionId } = await res.json();

        if (stripe && sessionId) {
            await stripe.redirectToCheckout({ sessionId });
        } else {
            console.error('Failed to create checkout session.');
        }
    };

    return (
        <div className={styles.paymentContainer}>
            <h1>Subscribe to Flashcard SaaS Pro</h1>
            <p>Get unlimited access to all features and tools by subscribing to our Pro plan.</p>
            <button onClick={handlePayment} className={styles.paymentButton}>
                Proceed to Payment
            </button>
        </div>
    );
}
