"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  enneagramQuestions,
  ENNEAGRAM_CORE_QUESTION_COUNT,
  type EnneagramQuestion,
} from "@/src/data/enneagramQuestions";
import {
  enneagramInstinctQuestions,
  ENNEAGRAM_INSTINCT_QUESTION_COUNT,
  type InstinctQuestion,
} from "@/src/data/enneagramInstinctQuestions";
import { scoreEnneagramAssessment } from "@/src/utils/enneagramAssessmentScoring";
import styles from "./page.module.css";

type AssessmentQuestion =
  | (EnneagramQuestion & { kind: "core" })
  | (InstinctQuestion & { kind: "instinct" });

const questions: AssessmentQuestion[] = [
  ...enneagramQuestions.map((question) => ({
    ...question,
    kind: "core" as const,
  })),
  ...enneagramInstinctQuestions.map((question) => ({
    ...question,
    kind: "instinct" as const,
  })),
];

const totalQuestions = questions.length;

const responseOptions = [
  { value: 1, label: "Rất không đúng" },
  { value: 2, label: "Không đúng" },
  { value: 3, label: "Trung lập" },
  { value: 4, label: "Khá đúng" },
  { value: 5, label: "Rất đúng" },
] as const;

export default function EnneagramAssessmentPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] =
    useState<Record<string, number>>({});
  const [error, setError] = useState("");

  const currentQuestion = questions[currentIndex];

  const answeredCount = questions.filter(
    (question) => answers[question.id] !== undefined,
  ).length;

  const allAnswered =
    answeredCount === totalQuestions;

  const coreQuestions = useMemo(
    () => questions.filter((q) => q.kind === "core"),
    [],
  );

  const instinctQuestions = useMemo(
    () =>
      questions.filter(
        (q) => q.kind === "instinct",
      ),
    [],
  );

  function goToQuestion(index: number) {
    setCurrentIndex(index);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function selectAnswer(value: number) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));

    setError("");
  }

  function next() {
    if (currentIndex < totalQuestions - 1) {
      goToQuestion(currentIndex + 1);
    }
  }

  function previous() {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
  }

  function submit() {
    if (!allAnswered) {
      setError(
        `Bạn còn ${totalQuestions - answeredCount} câu chưa trả lời.`,
      );
      return;
    }

    const result =
      scoreEnneagramAssessment(answers);

    if ("errors" in result) {
      setError(
        result.errors[0] ??
          "Không thể chấm điểm assessment.",
      );
      return;
    }

    sessionStorage.setItem(
      "mosaic_enneagram_result",
      JSON.stringify(result),
    );

    window.location.href =
      "/result/enneagram";
  }

  function renderMapButton(
    question: AssessmentQuestion,
    index: number,
  ) {
    const answered =
      answers[question.id] !== undefined;

    const current =
      index === currentIndex;

    return (
      <button
        key={question.id}
        type="button"
        className={`${styles.mapButton} ${
          answered
            ? styles.mapButtonAnswered
            : styles.mapButtonUnanswered
        } ${current ? styles.mapButtonCurrent : ""}`}
        onClick={() => goToQuestion(index)}
        aria-label={`Go to question ${index + 1}`}
      >
        {index + 1}
      </button>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <section className={styles.main}>
          <div className={styles.breadcrumb}>
            <Link
              href="/"
              className={styles.breadcrumbLink}
            >
              MOSAIC
            </Link>
            <span>/</span>
            <Link
              href="/test"
              className={styles.breadcrumbLink}
            >
              TEST
            </Link>
            <span>/</span>
            <span>ENNEAGRAM</span>
          </div>

          <header className={styles.header}>
            <p className={styles.eyebrow}>
              ENNEAGRAM ASSESSMENT
            </p>

            <h1 className={styles.title}>
              Enneagram Assessment
            </h1>

            <p className={styles.subtitle}>
              {totalQuestions} câu hỏi gồm{" "}
              {ENNEAGRAM_CORE_QUESTION_COUNT} câu về
              core motivation và{" "}
              {ENNEAGRAM_INSTINCT_QUESTION_COUNT} câu về
              instinctual pattern.
            </p>

            <p className={styles.instruction}>
              Hãy trả lời theo xu hướng thật của bạn trong
              phần lớn thời gian, không phải theo cách bạn
              nghĩ mình nên như thế nào.
            </p>
          </header>

          <section className={styles.questionCard}>
            <div className={styles.questionMeta}>
              <span>
                QUESTION {currentIndex + 1} /{" "}
                {totalQuestions}
              </span>

              <span
                className={
                  currentQuestion.kind === "core"
                    ? styles.badgeCore
                    : styles.badgeInstinct
                }
              >
                {currentQuestion.kind === "core"
                  ? "CORE MOTIVATION"
                  : "INSTINCT"}
              </span>
            </div>

            <h2 className={styles.questionText}>
              {currentQuestion.text}
            </h2>

            <p className={styles.scaleHint}>
              Chọn mức độ câu này đúng với bạn.
            </p>

            <div className={styles.scale}>
              {responseOptions.map((option) => {
                const selected =
                  answers[currentQuestion.id] ===
                  option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.scaleButton} ${
                      selected
                        ? styles.scaleButtonActive
                        : ""
                    }`}
                    onClick={() =>
                      selectAnswer(option.value)
                    }
                  >
                    <strong>{option.value}</strong>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className={styles.navigation}>
            <button
              type="button"
              className={styles.navButton}
              onClick={previous}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>

            <button
              type="button"
              className={styles.navButton}
              onClick={next}
              disabled={
                currentIndex === totalQuestions - 1
              }
            >
              Next →
            </button>
          </div>

          {error && (
            <p className={styles.error}>{error}</p>
          )}
        </section>

        <aside className={styles.side}>
          <div className={styles.map}>
            <div className={styles.mapHeader}>
              <div>
                <h2>Question Map</h2>
                <span className={styles.mapCount}>
                  {answeredCount}/{totalQuestions}
                </span>
              </div>

              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${
                      (answeredCount /
                        totalQuestions) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <p className={styles.mapSectionTitle}>
              CORE MOTIVATION · {coreQuestions.length}
            </p>

            <div className={styles.mapGrid}>
              {coreQuestions.map((question) => {
                const index =
                  questions.indexOf(question);

                return renderMapButton(
                  question,
                  index,
                );
              })}
            </div>

            <p className={styles.mapSectionTitle}>
              INSTINCT · {instinctQuestions.length}
            </p>

            <div className={styles.mapGrid}>
              {instinctQuestions.map((question) => {
                const index =
                  questions.indexOf(question);

                return renderMapButton(
                  question,
                  index,
                );
              })}
            </div>

            <div className={styles.sideLegend}>
              <span>
                <span
                  className={
                    styles.legendDotAnswered
                  }
                />
                Đã trả lời
              </span>

              <span>
                <span className={styles.legendDot} />
                Chưa trả lời
              </span>
            </div>

            <button
              type="button"
              className={styles.submit}
              onClick={submit}
              disabled={!allAnswered}
            >
              {allAnswered
                ? "Submit Assessment →"
                : `Còn ${
                    totalQuestions - answeredCount
                  } câu`}
            </button>

            <p className={styles.submitHint}>
              Có thể submit từ bất kỳ câu nào khi hoàn thành
              đủ {totalQuestions} câu.
            </p>

            <Link
              href="/test"
              className={styles.backLink}
            >
              ← Back to Tests
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
