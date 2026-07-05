import { useState, useMemo } from 'react';
import { initialChecklistItems } from '../data/checklistItems';
import CaseStudyIntro from './CaseStudyIntro';
import ChecklistHeader from './ChecklistHeader';
import ChecklistItem from './ChecklistItem';
import ScoreGauge from './ScoreGauge';
import styles from './ReadinessChecklist.module.css';

function getTier(score) {
    if (score >= 90) return 'Ready';
    if (score >= 60) return 'AlmostThere';
    return 'NeedsWork';
}

function ReadinessChecklist() {
    const [items, setItems] = useState(initialChecklistItems);
    const [saveState, setSaveState] = useState('idle');
    const [shareUrl, setShareUrl] = useState(null);

    function handleToggle(id) {
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    }

    function handleReset() {
        setItems(initialChecklistItems.map(item => ({ ...item, checked: false })));
        setSaveState('idle');
        setShareUrl(null);
    }

    // useMemo avoids recalculating on every render unless items actually change
    const { score, tier } = useMemo(() => {
        const totalWeight = items.reduce((sum, i) => sum + i.weight, 0);
        const earnedWeight = items
            .filter(i => i.checked)
            .reduce((sum, i) => sum + i.weight, 0);
        const calculatedScore = Math.round((earnedWeight / totalWeight) * 100);
        return { score: calculatedScore, tier: getTier(calculatedScore) };
    }, [items]);

    // Group items by category for rendering
    const categories = useMemo(() => {
        const map = {};
        items.forEach(item => {
            if (!map[item.category]) map[item.category] = [];
            map[item.category].push(item);
        });
        return map;
    }, [items]);

    async function handleSaveResult() {
        setSaveState('saving');
        setShareUrl(null);

        const checkedItems = items.filter(i => i.checked).map(i => i.id);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/results/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ score, tier, checked_items: checkedItems }),
            });

            const data = await response.json();
            setShareUrl(`${window.location.origin}/result/${data.id}`)
            setSaveState('success');
        } catch (err) {
            console.error('Failed to save result', err)
            setSaveState('error');
        }
    }

    function truncateUrl(url, maxLength = 28) {
        if (url.length <= maxLength) return url;
        return url.slice(0, maxLength) + '…';
    }

    return (
        <div className={styles.container}>

            <div className={`${styles.mobileScoreBadge} ${styles[tier]}`}>
                <span className={styles.badgeScore}>{score}%</span>
            </div>

            <ChecklistHeader tier={tier} />
            <CaseStudyIntro />

            <div className={styles.layout}>
                <div className={styles.gaugeColumn}>
                    <ScoreGauge score={score} tier={tier} />

                    <div className={styles.actions}>
                        <button onClick={handleReset} className={styles.resetButton}>
                            Reset
                        </button>
                        <button onClick={handleSaveResult} className={styles.saveButton} disabled={saveState == 'saving'}>
                            {saveState === 'saving' ? 'Saving...' : 'Save & Share'}
                        </button>
                    </div>

                    <div className={styles.statusArea}>
                        {saveState === 'success' && shareUrl && (
                            <p className={styles.shareLink}>
                                Saved!{' '}
                                <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                                    {truncateUrl(shareUrl)}
                                </a>
                            </p>
                        )}
                        {saveState === 'error' && (
                            <p className={styles.errorMessage}>
                                Couldn't save your result. Please try again.
                            </p>
                        )}
                    </div>
                </div>

                <div className={styles.checklistColumn}>
                    {Object.entries(categories).map(([category, categoryItems]) => (
                        <section key={category} className={styles.category}>
                            <h2 className={styles.categoryTitle}>{category}</h2>
                            {categoryItems.map(item => (
                                <ChecklistItem
                                    key={item.id}
                                    item={item}
                                    onToggle={handleToggle}
                                />
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReadinessChecklist;