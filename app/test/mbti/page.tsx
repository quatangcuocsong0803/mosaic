"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import cognitiveFunctionQuestions from "@/src/data/cognitiveFunctionQuestions";
import {
  scoreAnswers,
  type RawAnswers,
} from "@/src/utils/cognitiveFunctionScoring";

import styles from "./page.module.css";

const SCALE = [1, 2, 3, 4, 5] as const;

const SCALE_LABELS: Record<number, string> = {
  1: "Rất không đúng",
  2: "Không đúng",
  3: "Trung lập",
  4: "Khá đúng",
  5: "Rất đúng",
};

export default function MbtiTestPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<RawAnswers>({});
  const [error, setError] = useState("");

  const totalQuestions = cognitiveFunctionQuestions.length;
  const currentQuestion = cognitiveFunctionQuestions[currentIndex];

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const progress = Math.round(
    (answeredCount / totalQuestions) * 100,
  );

  const answerForCurrent =
    currentQuestion ? answers[currentQuestion.id] : undefined;

  const questionNumbers = useMemo(
    () => cognitiveFunctionQuestions.map((_, index) => index + 1),
    [],
  );

  const handleAnswer = (value: number) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: value,
    }));

    setError("");
  };

  const goToQuestion = (index: number) => {
    if (index < 0 || index >= totalQuestions) {
      return;
    }

    setCurrentIndex(index);
    setError("");
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((index) => index + 1);
    }
  };

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1);
    }
  };

  const handleSubmit = () => {
    if (!allAnswered) {
      setError(
        `Bạn còn ${totalQuestions - answeredCount} câu chưa trả lời. Hãy hoàn thành đủ ${totalQuestions} câu trước khi nộp.`,
      );
      return;
    }

    const result = scoreAnswers(answers);

    if ("errors" in result) {
      setError(result.errors.join(" "));
      return;
    }

    sessionStorage.setItem(
      "mosaic_scoring_result",
      JSON.stringify(result),
    );

    router.push("/result/mbti");
  };

  if (!currentQuestion) {
    return (
      <main className={styles.page}>
        <div className={styles.layout}>
          <p>Không tìm thấy bộ câu hỏi.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>

      <div className={styles.layout}>
        <section className={styles.main}>
          <header className={styles.header}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <Link
                href="/"
                aria-label="Mosaic Home"
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                }}
              >
                MOSAIC
              </Link>

              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-faint)",
                }}
              >
                /
              </span>

              <span className={styles.eyebrow} style={{ margin: 0 }}>
                MBTI / COGNITIVE FUNCTIONS
              </span>
            </div>

            <h1 className={styles.title}>
              Cognitive Function Assessment
            </h1>

            <p className={styles.subtitle}>
              72 câu hỏi theo thang Likert 1–5. Bạn có thể
              quay lại bất kỳ câu nào bằng Question Map bên phải.
            </p>
          </header>

          <section className={styles.questionCard}>
            <div className={styles.questionMeta}>
              <span className={styles.questionCount}>
                QUESTION {currentIndex + 1} / {totalQuestions}
              </span>

              <span className={styles.functionTag}>
                {currentQuestion.function}
              </span>
            </div>

            <h2 className={styles.questionText}>
              {currentQuestion.text}
            </h2>

            <p className={styles.scaleHint}>
              Chọn một mức độ phù hợp với bạn nhất.
            </p>

            <div
              className={styles.scale}
              role="radiogroup"
              aria-label="Likert scale"
            >
              {SCALE.map((value) => (
                <label
                  key={value}
                  className={`${styles.scaleButton} ${
                    answerForCurrent === value
                      ? styles.scaleButtonActive
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={value}
                    checked={answerForCurrent === value}
                    onChange={() => handleAnswer(value)}
                  />

                  <span className={styles.scaleValue}>
                    {value}
                  </span>

                  <span className={styles.scaleLabel}>
                    {SCALE_LABELS[value]}
                  </span>
                </label>
              ))}
            </div>
          </section>

          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goPrevious}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            <button
              type="button"
              className={styles.navButton}
              onClick={goNext}
              disabled={currentIndex === totalQuestions - 1}
            >
              Next →
            </button>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
        </section>

        <aside className={styles.side}>
          <div className={styles.sideHeader}>
            <h2 className={styles.sideTitle}>
              Question Map
            </h2>

            <span className={styles.sideProgress}>
              {answeredCount}/{totalQuestions}
            </span>
          </div>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.map}>
            {questionNumbers.map((number, index) => {
              const question =
                cognitiveFunctionQuestions[index];

              const answered =
                answers[question.id] !== undefined;

              const current = index === currentIndex;

              return (
                <button
                  key={question.id}
                  type="button"
                  className={`${styles.mapButton} ${
                    answered
                      ? styles.mapButtonAnswered
                      : ""
                  } ${
                    current
                      ? styles.mapButtonCurrent
                      : ""
                  }`}
                  onClick={() => goToQuestion(index)}
                  aria-label={`Go to question ${number}${
                    answered ? ", answered" : ", unanswered"
                  }`}
                >
                  {number}
                </button>
              );
            })}
          </div>

          <div className={styles.sideLegend}>
            <span className={styles.legendItem}>
              <span className={styles.legendDotAnswered} />
              Đã trả lời
            </span>

            <span className={styles.legendItem}>
              <span className={styles.legendDot} />
              Chưa trả lời
            </span>
          </div>

          <button
            type="button"
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!allAnswered}
          >
            {allAnswered
              ? "Submit Assessment →"
              : `Còn ${totalQuestions - answeredCount} câu`}
          </button>

          <p className={styles.submitHint}>
            Bạn có thể Submit từ bất kỳ câu nào khi đã trả lời
            đủ toàn bộ {totalQuestions} câu.
          </p>

          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <Link
              href="/test"
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              ← Back to Tests
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
