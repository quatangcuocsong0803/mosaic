import Link from "next/link";

export default function ResultHubPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "44px 20px 72px",
        background: "#f7f6f2",
        color: "#1c1c1c",
      }}
    >
      <div
        style={{
          width: "min(1000px, 100%)",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#77746d",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#1c1c1c",
              textDecoration: "none",
            }}
          >
            MOSAIC
          </Link>
          <span>/</span>
          <span>RESULT</span>
        </div>

        <header style={{ margin: "34px 0" }}>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            MOSAIC · RESULT
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(38px, 7vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
            }}
          >
            Results.
          </h1>
        </header>

        <section
          style={{
            display: "grid",
            gap: 16,
          }}
        >
          <Link
            href="/result/mbti"
            style={{
              display: "block",
              padding: 26,
              border: "1px solid #dedbd3",
              borderRadius: 22,
              background: "#ffffff",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 24 }}>
              MBTI / Cognitive Functions
            </h2>

            <p
              style={{
                margin: "10px 0 0",
                lineHeight: 1.65,
                opacity: 0.65,
              }}
            >
              Xem kết quả Cognitive Functions, function stack và
              mức độ phù hợp tương đối với 16 type.
            </p>

            <p
              style={{
                margin: "16px 0 0",
                fontWeight: 700,
              }}
            >
              Open MBTI Result →
            </p>
          </Link>

          <Link
            href="/result/enneagram"
            style={{
              display: "block",
              padding: 26,
              border: "1px solid #dedbd3",
              borderRadius: 22,
              background: "#ffffff",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <h2 style={{ margin: 0, fontSize: 24 }}>
              Enneagram
            </h2>

            <p
              style={{
                margin: "10px 0 0",
                lineHeight: 1.65,
                opacity: 0.65,
              }}
            >
              Xem core type, full 9-type motivation profile và
              instinctual stack.
            </p>

            <p
              style={{
                margin: "16px 0 0",
                fontWeight: 700,
              }}
            >
              Open Enneagram Result →
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
