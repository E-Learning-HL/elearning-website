import styles from './page.module.scss';
import LearnPage from './client';
export default function Learn({ params, searchParams }){
    return (
        <div className={styles.wpLearnPage}>
            <LearnPage />
        </div>
    );
}