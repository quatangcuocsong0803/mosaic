"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { EnneagramType } from "@/src/data/enneagramQuestions";
import {
  enneagramTypeOrder,
  enneagramTypes,
} from "@/src/data/enneagramTypes";
import styles from "./page.module.css";

type CertaintyLevel =
  | "low"
  | "moderate"
  | "high";

interface StoredResult {
  typeScores: Record<string, number>;
  rawScores: Record<string, number>;
  exposures: Record<string, number>;
  rankedTypes: Array<{
    type: EnneagramType;
    score: number;
    rawScore: number;
    exposure: number;
  }>;
  coreType: EnneagramType;
  wing: EnneagramType;
  wingStrength: number;
  certainty: {
    level: CertaintyLevel;
    margin: number;
    index: number;
  };
  tritype: {
    code: string;
    core: EnneagramType;
    heartFix: EnneagramType;
    headFix: EnneagramType;
    gutFix: EnneagramType;
  };
  instinctScores: Record<string, number>;
  instinctualStack: string[];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function scoreToRadius(score: number) {
  return 25 + clamp(score / 100, 0, 1) * 101;
}

function polarPoint(
  index: number,
  radius: number,
  cx = 140,
  cy = 140,
) {
  const angle =
    (Math.PI * 2 * index) / 9 - Math.PI / 2;

  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}

function certaintyLabel(
  level: CertaintyLevel,
) {
  switch (level) {
    case "high":
      return "High";
    case "moderate":
      return "Moderate";
    default:
      return "Low";
  }
}

export default function EnneagramResultPage() {
  const [result, setResult] =
    useState<StoredResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(
        "mosaic_enneagram_result",
      );

      if (stored) {
        setResult(
          JSON.parse(stored) as StoredResult,
        );
      }
    } catch {
      setResult(null);
    } finally {
      setMounted(true);
    }
  }, []);

  const radarPoints = useMemo(() => {
    if (!result) return "";

    return enneagramTypeOrder
      .map((type, index) => {
        const score = Number(
          result.typeScores[String(type)] ?? 50,
        );

        const point = polarPoint(
          index,
          scoreToRadius(score),
        );

        return `${point.x},${point.y}`;
      })
      .join(" ");
  }, [result]);

  if (!mounted) {
    return <main className={styles.page} />;
  }

  if (!result) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <Link
              href="/"
              className={styles.breadcrumbLink}
            >
              MOSAIC
            </Link>
            <span>/</span>
            <Link
              href="/result"
              className={styles.breadcrumbLink}
            >
              RESULT
            </Link>
            <span>/</span>
            <span>ENNEAGRAM</span>
          </div>

          <section className={styles.emptyState}>
            <h1>ENNEAGRAM RESULT</h1>

            <p>
              Complete the Enneagram assessment to
              generate a result.
            </p>

            <Link
              href="/test/enneagram"
              className={styles.primaryButton}
            >
              Take the test →
            </Link>
          </section>
        </div>
      </main>
    );
  }

  const coreInfo =
    enneagramTypes[result.coreType];

  const wingInfo =
    enneagramTypes[result.wing];

  const ranking = enneagramTypeOrder
    .map((type) => ({
      type,
      score: Number(
        result.typeScores[String(type)] ?? 50,
      ),
    }))
    .sort((a, b) => b.score - a.score);

  const instinctStack =
    result.instinctualStack ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link
            href="/"
            className={styles.breadcrumbLink}
          >
            MOSAIC
          </Link>

          <span>/</span>

          <Link
            href="/result"
            className={styles.breadcrumbLink}
          >
            RESULT
          </Link>

          <span>/</span>

          <span>ENNEAGRAM</span>
        </div>

        <header className={styles.header}>
          <p className={styles.eyebrow}>
            ENNEAGRAM RESULT
          </p>

          <h1 className={styles.title}>
            ENNEAGRAM RESULT
          </h1>

          <p className={styles.subtitle}>
            Core motivation, wing, certainty, instinctual
            pattern and tritype-style profile.
          </p>
        </header>

        <section
          className={styles.coreCard}
          style={{
            borderColor: coreInfo.color,
            background: `linear-gradient(135deg, ${coreInfo.softColor}, #ffffff)`,
          }}
        >
          <div className={styles.coreSummary}>
            <div
              className={styles.coreNumber}
              style={{
                color: coreInfo.color,
              }}
            >
              {result.coreType}
            </div>

            <div>
              <p className={styles.coreLabel}>
                CORE TYPE
              </p>

              <h2 className={styles.coreTitle}>
                Type {result.coreType}
              </h2>

              <p className={styles.coreName}>
                {coreInfo.name}
              </p>

              <div className={styles.keywordRow}>
                {coreInfo.keywords.map(
                  (keyword) => (
                    <span
                      key={keyword}
                      className={styles.keyword}
                    >
                      {keyword}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className={styles.coreMeta}>
            <div>
              <span>Core score</span>
              <strong>
                {Math.round(
                  result.typeScores[
                    String(result.coreType)
                  ] ?? 50,
                )}
                /100
              </strong>
            </div>

            <div>
              <span>Wing</span>
              <strong>
                {result.coreType}w{result.wing}
              </strong>
            </div>

            <div>
              <span>Certainty</span>
              <strong>
                {certaintyLabel(
                  result.certainty.level,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className={styles.chartSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p
                className={
                  styles.sectionEyebrow
                }
              >
                MOTIVATION DISTRIBUTION
              </p>

              <h2>9-type profile</h2>
            </div>

            <span className={styles.scaleNote}>
              relative index / 100
            </span>
          </div>

          <div className={styles.chartCard}>
            <div className={styles.chartWrap}>
              <svg
                viewBox="0 0 280 280"
                className={styles.chart}
                role="img"
                aria-label="Enneagram nine type motivation profile"
              >
                <circle
                  cx="140"
                  cy="140"
                  r="126"
                  className={styles.chartOuter}
                />

                {[0.25, 0.5, 0.75, 1].map(
                  (level) => (
                    <polygon
                      key={level}
                      points={enneagramTypeOrder
                        .map((_, index) => {
                          const point =
                            polarPoint(
                              index,
                              25 +
                                101 * level,
                            );

                          return `${point.x},${point.y}`;
                        })
                        .join(" ")}
                      className={styles.chartGrid}
                    />
                  ),
                )}

                {enneagramTypeOrder.map(
                  (_, index) => {
                    const inner =
                      polarPoint(index, 25);

                    const outer =
                      polarPoint(index, 126);

                    return (
                      <line
                        key={`spoke-${index}`}
                        x1={inner.x}
                        y1={inner.y}
                        x2={outer.x}
                        y2={outer.y}
                        className={
                          styles.chartSpoke
                        }
                      />
                    );
                  },
                )}

                <polygon
                  points={radarPoints}
                  className={
                    styles.chartProfile
                  }
                  style={{
                    stroke: coreInfo.color,
                    fill: coreInfo.color,
                  }}
                />

                {enneagramTypeOrder.map(
                  (type, index) => {
                    const score = Number(
                      result.typeScores[
                        String(type)
                      ] ?? 50,
                    );

                    const point = polarPoint(
                      index,
                      scoreToRadius(score),
                    );

                    const labelPoint =
                      polarPoint(index, 143);

                    return (
                      <g key={type}>
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="4.5"
                          style={{
                            fill:
                              enneagramTypes[
                                type
                              ].color,
                          }}
                        />

                        <text
                          x={labelPoint.x}
                          y={labelPoint.y}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className={
                            styles.chartLabel
                          }
                          style={{
                            fill:
                              enneagramTypes[
                                type
                              ].color,
                          }}
                        >
                          {type}
                        </text>
                      </g>
                    );
                  },
                )}

                <circle
                  cx="140"
                  cy="140"
                  r="28"
                  className={
                    styles.chartCenter
                  }
                />

                <text
                  x="140"
                  y="137"
                  textAnchor="middle"
                  className={
                    styles.centerType
                  }
                >
                  {result.coreType}
                </text>

                <text
                  x="140"
                  y="153"
                  textAnchor="middle"
                  className={
                    styles.centerText
                  }
                >
                  CORE
                </text>
              </svg>
            </div>

            <div className={styles.scoreList}>
              {ranking.map((item, index) => {
                const info =
                  enneagramTypes[item.type];

                return (
                  <div
                    key={item.type}
                    className={
                      styles.scoreRow
                    }
                  >
                    <div
                      className={
                        styles.scoreHeader
                      }
                    >
                      <div
                        className={
                          styles.scoreIdentity
                        }
                      >
                        <span
                          className={
                            styles.scoreDot
                          }
                          style={{
                            background:
                              info.color,
                          }}
                        />

                        <strong>
                          Type {item.type}
                        </strong>

                        <span>
                          {info.name}
                        </span>
                      </div>

                      <span>
                        {item.score.toFixed(
                          1,
                        )}
                      </span>
                    </div>

                    <div
                      className={
                        styles.scoreBar
                      }
                    >
                      <div
                        className={
                          styles.scoreBarFill
                        }
                        style={{
                          width: `${clamp(
                            item.score,
                            0,
                            100,
                          )}%`,
                          background:
                            info.color,
                        }}
                      />
                    </div>

                    {index === 0 && (
                      <span
                        className={
                          styles.topTag
                        }
                      >
                        CORE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.infoGrid}>
          <article className={styles.infoCard}>
            <p className={styles.sectionEyebrow}>
              WING
            </p>

            <h2>
              {result.coreType}w{result.wing}
            </h2>

            <p
              className={styles.infoAccent}
              style={{
                color: wingInfo.color,
              }}
            >
              {wingInfo.name}
            </p>

            <p>
              The wing is selected only from the two
              types adjacent to the core type.
            </p>

            <p
              className={styles.mutedNote}
            >
              Relative wing strength:{" "}
              <strong>
                {Math.round(
                  result.wingStrength,
                )}
                %
              </strong>
            </p>
          </article>

          <article className={styles.infoCard}>
            <p className={styles.sectionEyebrow}>
              CERTAINTY
            </p>

            <h2>
              {certaintyLabel(
                result.certainty.level,
              )}
            </h2>

            <p>
              Top-two score margin:{" "}
              <strong>
                {Number(
                  result.certainty.margin ??
                    0,
                ).toFixed(1)}
              </strong>
            </p>

            <p
              className={styles.mutedNote}
            >
              This is a MOSAIC scoring heuristic, not a
              probability or validated confidence estimate.
            </p>
          </article>

          <article className={styles.infoCard}>
            <p className={styles.sectionEyebrow}>
              INSTINCTUAL STACK
            </p>

            <h2>
              {instinctStack
                .map((value) =>
                  value.toUpperCase(),
                )
                .join(" / ")}
            </h2>

            <div className={styles.instinctRows}>
              {["sp", "sx", "so"].map(
                (instinct) => {
                  const score = Number(
                    result.instinctScores?.[
                      instinct
                    ] ?? 50,
                  );

                  return (
                    <div
                      key={instinct}
                      className={
                        styles.instinctRow
                      }
                    >
                      <span>
                        {instinct.toUpperCase()}
                      </span>

                      <div
                        className={
                          styles.instinctBar
                        }
                      >
                        <div
                          className={
                            styles.instinctBarFill
                          }
                          style={{
                            width: `${clamp(
                              score,
                              0,
                              100,
                            )}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {score.toFixed(1)}
                      </strong>
                    </div>
                  );
                },
              )}
            </div>
          </article>

          <article className={styles.infoCard}>
            <p className={styles.sectionEyebrow}>
              TRITYPE
            </p>

            <h2>
              {result.tritype.code}
            </h2>

            <div className={styles.tritypeGrid}>
              <div>
                <span>Heart</span>
                <strong>
                  Type {result.tritype.heartFix}
                </strong>
              </div>

              <div>
                <span>Head</span>
                <strong>
                  Type {result.tritype.headFix}
                </strong>
              </div>

              <div>
                <span>Gut</span>
                <strong>
                  Type {result.tritype.gutFix}
                </strong>
              </div>
            </div>

            <p
              className={styles.mutedNote}
            >
              One strongest type is selected from each
              center; the core type fixes its own center.
            </p>
          </article>
        </section>

        <div className={styles.footerActions}>
          <Link
            href="/test/enneagram"
            className={styles.secondaryButton}
          >
            ← Retake Enneagram
          </Link>

          <Link
            href="/test"
            className={styles.secondaryButton}
          >
            Back to Tests
          </Link>

          <Link
            href="/"
            className={styles.primaryButton}
          >
            Home →
          </Link>
        </div>
      </div>
    </main>
  );
}
