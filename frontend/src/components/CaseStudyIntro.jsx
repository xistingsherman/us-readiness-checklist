import styles from './CaseStudyIntro.module.css'

function CaseStudyIntro() {

    return (
        <section className={styles.intro}>
            <div className={styles.block}>
                <p className={styles.label}>The Problem</p>
                <p className={styles.text}>
                    User stories were being developed without clarity on testing scope, environment readiness, and dependencies. This caused back-and-forth mid-sprint.
                </p>
                <p className={styles.label}>What I Built</p>
                <p className={styles.text}>
                    Worked with scrum and development to create a checklist that identifies key information before a story is picked up, prioritizing criteria most likely to cause delays if not addressed.
                </p>
            </div>
            <div className={styles.block}>
                <p className={styles.laebl}>The Outcome</p>
                <p className={styles.text}>
                    Adopted by the team as part of the standard workflow, reducing ambiguity at assignment and without increasing process overhead.
                </p>
            </div>
        </section>
    )
}

export default CaseStudyIntro;