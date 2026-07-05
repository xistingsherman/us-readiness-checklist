import styles from './ChecklistHeader.module.css';

function ChecklistHeader({ tier }) {
    const eyebrow = {
        NeedsWork: 'Let\'s get this story ready',
        AlmostThere: 'Almost there - a few gaps left',
        Ready: 'Looking solid - ready to ship'
    }

    return (
        <header className={styles.header}>
            <p className={styles.eyebrow}>{eyebrow[tier]}</p>
            <h1 className={styles.title}>Is your story ready?</h1>
            <p className={styles.tagline}>
                Check off what's true and watch the story come together
            </p>
        </header>
    )
};

export default ChecklistHeader;