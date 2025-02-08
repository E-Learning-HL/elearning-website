import RegisterPage from '@/src/app/register/client'
import styles from './page.module.scss'
import { Layout } from 'antd';

export async function generateMetadata({ params, searchParams }) {
    return {
      title: "Đăng ký | S eLearning",
    };
  }

export default function Register(){
    return (
        <div className={styles.loginPage}>
            <RegisterPage />
        </div>
    );
}