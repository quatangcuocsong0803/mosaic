import Link from "next/link";
import styles from "./page.module.css";

export default function TestPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadcrumbLink}>
            MOSAIC
          </Link>
          <span>/</span>
          <span>TEST</span>
        </div>

        <header className={styles.header}>
          <h1 className={styles.title}>Choose your test.</h1>
          <p className={styles.subtitle}>
            Mỗi assessment là một module độc lập và có hệ thống chấm điểm riêng.
          </p>
        </header>

        <div className={styles.cards}>
          <Link href="/test/mbti" className={styles.card}>
            <div className={styles.cardTop}>
              <h2>MBTI / Cognitive Functions</h2>
              <span className={styles.statusActive}>Available →</span>
            </div>
            <p>
              72 câu hỏi để khám phá xu hướng sử dụng Cognitive Functions và mức độ
              phù hợp tương đối với 16 function stacks.
            </p>
          </Link>

          <Link href="/test/enneagram" className={styles.card}>
            <div className={styles.cardTop}>
              <h2>Enneagram</h2>
              <span className={styles.statusActive}>Available →</span>
            </div>
            <p>
              Khám phá 9 core types và wing qua bài đánh giá core + instinct gồm
              66 câu hỏi.
            </p>
          </Link>

          <div className={`${styles.card} ${styles.cardDisabled}`}>
            <div className={styles.cardTop}>
              <h2>Big Five</h2>
              <span>Coming soon</span>
            </div>
            <p>Mô hình tính cách dựa trên năm nhóm đặc điểm lớn.</p>
          </div>
        </div>

        <div className={styles.resultsLinkWrap}>
          <Link href="/result" className={styles.resultsLink}>
            View Results →
          </Link>
        </div>
      </div>
    </main>
  );
}
