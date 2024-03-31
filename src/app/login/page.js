import LoginPage from '@/src/app/login/client'
import styles from './page.module.scss'
import { Layout } from 'antd';

export default function Login(){
    return (
        <div className={styles.loginPage}>
            <LoginPage />
        </div>
    );
}