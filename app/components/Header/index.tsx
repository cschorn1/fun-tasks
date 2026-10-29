import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.brand}
        aria-label="FunTasks — página inicial"
      >
        <span className={styles.fun}>Fun</span>
        <span className={styles.tasks}>Tasks</span>
      </Link>
    </header>
  );
}
