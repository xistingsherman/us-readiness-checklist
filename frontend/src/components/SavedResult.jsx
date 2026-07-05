import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SavedResult.module.css'
import { initialChecklistItems } from '../data/checklistItems';

function SavedResult() {
    const { id } = useParams();
    const [result, setResult] = useState(null);
    const [status, setStatus] = useState('loading');

    useEffect(() => {
        async function fetchResult() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/results/${id}/`)
                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }
                const data = await response.json();
                setResult(data);
                setStatus('success');
            }
            catch (err) {
                console.log('Failed to fetch result: ', err);
                setStatus('error');
            }
        }
        fetchResult();
    }, [id]);

    if (status === 'loading') {
        return <p className={styles.message}>Loading result...</p>
    }

    if (status === 'error') {
        return <p className={styles.message}>Couldn't find that result.</p>
    }

    const labelById = Object.fromEntries(initialChecklistItems.map(item => [item.id, item.label]))

    return (
        <div className={styles.container}>
            <h1 className={styles.score}>{result.score}</h1>
            <p className={styles.tier}>{result.tier}</p>
            <p className={styles.meta}>Saved on {new Date(result.created_at).toLocaleDateString()}</p>
            <ul className={styles.itemList}>
                {result.checked_items.map(itemId => (
                    <li key={itemId}>{labelById[itemId] || itemId}</li>
                ))}
            </ul>
        </div>
    )
}

export default SavedResult;