"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { type ScoringResult } from "@/src/utils/cognitiveFunctionScoring";
import cognitiveFunctions from "@/src/data/cognitiveFunctions";
import mbtiTypeStacks from "@/src/data/mbtiTypeStacks";
import typeDescriptions from "@/src/data/typeDescriptions";

export default function ResultPage() {
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAllTypes, setShowAllTypes] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("mosaic_scoring_result");

      if (stored) {
        const parsed = JSON.parse(stored) as ScoringResult;
        setResult(parsed);
      }
    } catch (e) {
      console.error("Failed to parse scoring result from sessionStorage", e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main
        className="mosaic-page-container"
        style={{ justifyContent: "center" }}
      >
<p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          Loading your assessment results...
        </p>
      </main>
    );
  }

  if (!result) {
    return (
      <main
        className="mosaic-page-container"
        style={{ justifyContent: "center" }}
      >
        <div
          className="mosaic-card"
          style={{
            maxWidth: "480px",
            textAlign: "center",
            padding: "2.5rem 2rem",
          }}
        >
          <h1
            className="mosaic-title"
            style={{ fontSize: "1.375rem", marginBottom: "0.75rem" }}
          >
            No Results Found
          </h1>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginBottom: "1.75rem",
            }}
          >
            Please complete the assessment to generate your cognitive function
            profile.
          </p>

          <Link
            href="/test/mbti"
            className="mosaic-btn-primary"
            style={{
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Go to Assessment
          </Link>
        </div>
      </main>
    );
  }

  const profileType =
    result.typeCompatibility?.bestFitType ?? result.bestFitType;

  const profileCompatibility =
    result.typeCompatibility?.rankedTypes.find(
      (item) => item.type === profileType,
    )?.compatibility ?? 0;

  const bestTypeStack = mbtiTypeStacks[profileType];

  const stackDetails = bestTypeStack
    ? [
        { role: "Dominant", fn: bestTypeStack.dominant },
        { role: "Auxiliary", fn: bestTypeStack.auxiliary },
        { role: "Tertiary", fn: bestTypeStack.tertiary },
        { role: "Inferior", fn: bestTypeStack.inferior },
      ]
    : [];

  const typeDescription = typeDescriptions[profileType];

  const compatibilityRanking =
    result.typeCompatibility?.rankedTypes ?? [];

  const visibleTypes = showAllTypes
    ? compatibilityRanking
    : compatibilityRanking.slice(0, 3);

  return (
    <main className="mosaic-page-container">
      {/* Result Header */}
      <header
        className="mosaic-header"
        style={{ maxWidth: "760px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.625rem",
          }}
        >
          <span className="mosaic-brand">MOSAIC</span>

          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-faint)",
            }}
          >
            /
          </span>

          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            Typology Results
          </span>
        </div>

        <Link href="/test/mbti" className="mosaic-link-btn">
          Retake Assessment
        </Link>
      </header>

      <div className="mosaic-result-container">
        {/* 1. Primary Profile */}
        <section
          className="mosaic-card"
          style={{
            maxWidth: "100%",
            margin: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                color: "var(--text-muted)",
              }}
            >
              YOUR MOSAIC TYPE
            </span>

            <h1
              className="mosaic-title"
              style={{
                fontSize: "3rem",
                marginTop: "0.25rem",
              }}
            >
              {profileType}
            </h1>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                marginTop: "0.5rem",
                maxWidth: "520px",
                lineHeight: "1.55",
              }}
            >
              Your responses most closely match the {profileType}{" "}
              cognitive-function pattern.
            </p>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                marginTop: "0.75rem",
              }}
            >
              Profile Fit:{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {profileCompatibility}%
              </strong>
            </p>
          </div>

          {bestTypeStack && (
            <div className="mosaic-stack-chips">
              {stackDetails.map((item) => (
                <div className="mosaic-chip" key={item.role}>
                  <span className="mosaic-chip-role">
                    {item.role}
                  </span>

                  <span className="mosaic-chip-fn">
                    {item.fn}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 2. Type Overview */}
        {typeDescription && (
          <section
            className="mosaic-card"
            style={{
              maxWidth: "100%",
              margin: 0,
            }}
          >
            <h2
              className="mosaic-title"
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.625rem",
              }}
            >
              About {profileType}
            </h2>

            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              {typeDescription.overview}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {typeDescription.keywords.map((keyword: string) => (
                <span className="mosaic-chip" key={keyword}>
                  <span className="mosaic-chip-fn">
                    {keyword}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 3. Cognitive Function Breakdown */}
        <section
          className="mosaic-card"
          style={{
            maxWidth: "100%",
            margin: 0,
          }}
        >
          <h2
            className="mosaic-title"
            style={{
              fontSize: "1.25rem",
              marginBottom: "0.375rem",
            }}
          >
            Cognitive Function Scores
          </h2>

          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
            }}
          >
            Calculated average scores for the 8 cognitive functions
            (scale 1.00 – 5.00).
          </p>

          <div>
            {result.functionRanking.map((item, idx) => {
              const meta = cognitiveFunctions[item.id];
              const scorePercent = Math.round(
                (item.score / 5) * 100,
              );

              return (
                <div
                  key={item.id}
                  className="mosaic-function-row"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "0.375rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-faint)",
                          fontWeight: 600,
                        }}
                      >
                        #{idx + 1}
                      </span>

                      <strong
                        style={{
                          fontSize: "0.9375rem",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.id}
                      </strong>

                      <span
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        — {meta?.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.score.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="mosaic-progress-track"
                    style={{
                      height: "4px",
                      margin: "0.5rem 0",
                    }}
                  >
                    <div
                      className="mosaic-progress-fill"
                      style={{
                        width: `${scorePercent}%`,
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      lineHeight: "1.4",
                    }}
                  >
                    {meta?.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. 16 Types Profile Fit */}
        <section
          className="mosaic-card"
          style={{
            maxWidth: "100%",
            margin: 0,
          }}
        >
          <h2
            className="mosaic-title"
            style={{
              fontSize: "1.25rem",
              marginBottom: "0.375rem",
            }}
          >
            16 Types Profile Fit
          </h2>

          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginBottom: "1.25rem",
              lineHeight: "1.5",
            }}
          >
            Relative compatibility based on cognitive-function
            strength, rank ordering, and theoretical stack position.
            This is not a probability or accuracy score.
          </p>

          <div className="mosaic-type-grid">
            {visibleTypes.map((typeEntry, rank) => {
              const isTop = rank === 0;

              return (
                <div
                  key={typeEntry.type}
                  className={`mosaic-type-item ${
                    isTop ? "top-match" : ""
                  }`}
                >
                  <span className="mosaic-type-label">
                    <span
                      style={{
                        opacity: 0.6,
                        marginRight: "0.375rem",
                      }}
                    >
                      {rank + 1}.
                    </span>

                    <strong>{typeEntry.type}</strong>
                  </span>

                  <span
                    className="mosaic-type-score"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: isTop
                        ? "#ffffff"
                        : "var(--text-muted)",
                    }}
                  >
                    {typeEntry.compatibility}%
                  </span>
                </div>
              );
            })}
          </div>

          {compatibilityRanking.length > 3 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "1.25rem",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setShowAllTypes((current) => !current)
                }
                className="mosaic-link-btn"
                style={{
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showAllTypes ? "Show top 3" : "View all 16"}
              </button>
            </div>
          )}
        </section>

        {/* 5. Function Stack Details */}
        {bestTypeStack && (
          <section
            className="mosaic-card"
            style={{
              maxWidth: "100%",
              margin: 0,
            }}
          >
            <h2
              className="mosaic-title"
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.375rem",
              }}
            >
              Understanding Your Profile
            </h2>

            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
                lineHeight: "1.5",
              }}
            >
              Your four-position cognitive-function stack and the
              corresponding function scores.
            </p>

            <div className="mosaic-type-grid">
              {stackDetails.map((item) => {
                const meta = cognitiveFunctions[item.fn];
                const score =
                  result.functionScores[item.fn];

                return (
                  <div
                    key={item.role}
                    className="mosaic-type-item"
                    style={{
                      display: "block",
                      padding: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                        marginBottom: "0.375rem",
                      }}
                    >
                      {item.role}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.5rem",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "1.125rem",
                        }}
                      >
                        {item.fn}
                      </strong>

                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {meta?.name}
                      </span>
                    </div>

                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {score?.toFixed(2)}
                    </div>

                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        lineHeight: "1.45",
                        marginTop: "0.5rem",
                      }}
                    >
                      {meta?.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "1.75rem",
          }}
        >
          <Link
            href="/test"
            className="mosaic-link-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.7rem 1rem",
              border: "1px solid var(--border-color, #dedbd3)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            ← Back to Tests
          </Link>

          <Link
            href="/"
            className="mosaic-link-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.7rem 1rem",
              border: "1px solid var(--border-color, #dedbd3)",
              borderRadius: "0.75rem",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            ← Home
          </Link>
        </div>


      <footer
        style={{
          textAlign: "center",
          fontSize: "0.75rem",
          color: "var(--text-faint)",
          marginTop: "2rem",
        }}
      >
        MOSAIC — Cognitive Function Assessment
      </footer>
    </main>
  );
}
