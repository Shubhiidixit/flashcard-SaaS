import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'; // Import your CSS module

export default function GenerateFlashcards() {
    const [text, setText] = useState('');
    const [flashcards, setFlashcards] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [setName, setSetName] = useState('');
    const [flashcardsSaved, setFlashcardsSaved] = useState(false);
    const router = useRouter();

    const handleGenerate = () => {
        if (text) {
            setIsGenerating(true);
            setTimeout(() => {
                const newFlashcards = text.split('.').map((sentence) => ({
                    id: Math.random(),
                    content: sentence.trim(),
                }));
                setFlashcards(newFlashcards);
                setIsGenerating(false);
                setShowSaveModal(true);
            }, 2000); // Simulate generation delay
        }
    };

    const saveFlashcards = () => {
        const savedSets = JSON.parse(localStorage.getItem('flashcardSets')) || [];
        savedSets.push({ name: setName, flashcards, date: new Date().toLocaleDateString() });
        localStorage.setItem('flashcardSets', JSON.stringify(savedSets));
        setShowSaveModal(false);
        setFlashcardsSaved(true);
    };

    const handleViewSets = () => {
        router.push('/flashcards'); // Redirect to the flashcards page
    };

    return (
        <div className={styles.generateFlashcardsContainer}>
            <h1>Flashcard App</h1>
            <div className={styles.flashcardsDisplay}>
                {flashcards.length === 0 ? (
                    <p>No flashcards generated yet. Enter text and click "Generate Flashcards".</p>
                ) : (
                    flashcards.map((card) => <p key={card.id}>{card.content}</p>)
                )}
            </div>
            <input
                type="text"
                placeholder="Enter text to generate flashcards"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={styles.textInput}
            />
            <button onClick={handleGenerate} disabled={isGenerating} className={styles.generateFlashcardsButton}>
                {isGenerating ? 'Generating...' : 'Generate Flashcards'}
            </button>
            {showSaveModal && (
                <div className={styles.saveModal}>
                    <input
                        type="text"
                        placeholder="Enter flashcard set name"
                        value={setName}
                        onChange={(e) => setSetName(e.target.value)}
                        className={styles.textInput}
                    />
                    <button onClick={saveFlashcards} className={styles.saveButton}>Save Flashcard</button>
                </div>
            )}
            {flashcardsSaved && (
                <div className={styles.flashcardSaved}>
                    <p>Flashcards saved successfully!</p>
                    <button onClick={handleViewSets} className={styles.viewSetsButton}>View Saved Flashcards</button>
                </div>
            )}
        </div>
    );
}
