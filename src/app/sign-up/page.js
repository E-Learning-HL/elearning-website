import LoginPage from '@/src/app/login/client'
import styles from './page.module.scss'
import { Layout } from 'antd';

export default function ForgotPassword(){
    return (
        <div className={styles.signUpPage}>
            <SignUpPage />
        </div>
    );
}