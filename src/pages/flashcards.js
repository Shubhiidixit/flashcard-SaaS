import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'; // Import your CSS module

export default function FlashcardSets() {
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
        loadFlashcardSets();
    }, []);

    const loadFlashcardSets = () => {
        const savedFlashcards = JSON.parse(localStorage.getItem('flashcardSets')) || [];
        setFlashcardSets(savedFlashcards);
    };

    const deleteFlashcardSet = (indexToDelete) => {
        const updatedFlashcardSets = flashcardSets.filter((_, index) => index !== indexToDelete);
        localStorage.setItem('flashcardSets', JSON.stringify(updatedFlashcardSets));
        setFlashcardSets(updatedFlashcardSets);
    };

    return (
        <div className={styles.flashcardSetsContainer}>
            <h1>Saved Flashcards</h1>
            {flashcardSets.length > 0 ? (
                flashcardSets.map((set, index) => (
                    <div key={index} className={styles.flashcardSet}>
                        <div className={styles.flashcardSetHeader}>
                            <h3>{set.name || 'Untitled Set'}</h3>
                            <button
                                className={styles.deleteButton}
                                onClick={() => deleteFlashcardSet(index)}
                            >
                                Delete
                            </button>
                        </div>
                        <p>Created: {set.date}</p>
                        {set.flashcards.map((card, cardIndex) => (
                            <p key={cardIndex}>{card.content}</p>
                        ))}
                    </div>
                ))
            ) : (
                <p>No flashcards saved yet.</p>
            )}
        </div>
    );
}
