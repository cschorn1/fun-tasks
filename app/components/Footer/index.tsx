import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        2026 FunTasks - Todos os direitos Reservados
      </p>

      <Image
        className={styles.logo}
        src="/images/logo.png"
        alt="FunTasks"
        width={80}
        height={80}
      />

      <div className={styles.contact}>
        <p>Conecte-se com criador:</p>
        <nav className={styles.socialLinks} aria-label="Redes sociais do criador">
          <a
            className={styles.socialLink}
            href="https://www.instagram.com/conradoschorn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            className={styles.socialLink}
            href="https://www.linkedin.com/in/conrado-schorn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
