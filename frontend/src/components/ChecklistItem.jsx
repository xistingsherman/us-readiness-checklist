import { useState } from 'react';
import styles from './ChecklistItem.module.css';

function ChecklistItem({ item, onToggle }) {
    const [justChecked, setJustChecked] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false)

    function handleChange() {
        const willBeChecked = !item.checked;
        onToggle(item.id);

        if (willBeChecked) {
            setJustChecked(true);
            setTimeout(() => setJustChecked(false), 300);
        }
    }

    return (
        <div className={styles.row}>
            <label className={styles.item}>
                <input type="checkbox" checked={item.checked} onChange={handleChange} className={styles.input} />
                <span className={`${styles.box} ${item.checked ? styles.checked : ''} ${justChecked ? styles.snap : ''
                    }`}>
                    {item.checked && (
                        <svg viewBox="0 0 16 16" className={styles.checkmark}>
                            <polyline points="3, 8 7, 12 13, 4" />
                        </svg>
                    )}
                </span>
                <span className={styles.label}>{item.label}</span>
            </label>

            {
                item.detail && (
                    <div className={styles.tooltipWrapper}>
                        <button type="button" className={styles.infoButton}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                            onFocus={() => setShowTooltip(true)}
                            onBlur={() => setShowTootip(false)}
                            onClick={() => setShowTooltip(prev => !prev)}
                            aria-label={'Why this matters: ${item.label}'}
                        >i</button>
                        {showTooltip && (
                            <div className={styles.tooltip} role="tooltip">
                                {item.detail}
                            </div>
                        )}
                    </div>
                )}

        </div>

    )
}

export default ChecklistItem;