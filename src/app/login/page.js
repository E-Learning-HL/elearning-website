import LoginPage from "@/src/app/login/client";
import styles from "./page.module.scss";
import { Layout } from "antd";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className={styles.loginPage}>
      <LoginPage />
    </div>
  );
}