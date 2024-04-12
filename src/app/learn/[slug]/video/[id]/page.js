import VideoLearningPage from './client';
import styles from './page.module.scss';
export default function VideoLearning({ params, searchParams }){

    return(
        <div className={styles.wpVideoLearning}>
            <VideoLearningPage />
        </div>
    );
}