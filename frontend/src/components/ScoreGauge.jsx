import { useEffect, useState } from 'react';
import styles from './ScoreGauge.module.css'

function ScoreGauge({ score, tier }) {

    const [displayScore, setDisplayScore] = useState(0);

    useEffect(() => {
        const duration = 600; // ms
        const start = displayScore;
        const change = score - start;
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayScore(Math.round(start + change * eased));
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score]);

    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return <div className={styles.wrapper}>
        <svg width="200" height="200" viewBox="0 0 200 200" className={styles.svg}>
            { /* track incomplete outline */}
            <circle cx="100" cy="100" r={radius} className={styles.track} />
            {/*fill: assembles as score increases*/}
            <circle cx="100" cy="100" r={radius} className={`${styles.fill} ${styles[tier.replace(/\s+/g, '')]}`}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 100 100)" />
        </svg>

        <div className={styles.center}>
            <span className={styles.number}>{displayScore}</span>
            <span className={styles.percent}>%</span>
            <span className={styles.tierLabel}>{tier}</span>
        </div>
    </div>;
}
export default ScoreGauge;