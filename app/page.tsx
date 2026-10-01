import Link from "next/link";

const features = [
  {
    title: "Test",
    description:
      "Khám phá các mô hình tính cách qua MBTI, Enneagram và Big Five.",
    href: "/test",
    active: true,
  },
  {
    title: "Profile",
    description:
      "Trang hồ sơ tổng hợp kết quả, thông tin và sở thích của bạn.",
    href: "/profile",
    active: false,
  },
  {
    title: "Discover / Matching",
    description:
      "Khám phá những người có kiểu tính cách hoặc mối quan tâm tương đồng.",
    href: "/discover",
    active: false,
  },
  {
    title: "Discussion",
    description:
      "Không gian thảo luận về tính cách, hành vi và các chủ đề liên quan.",
    href: "/discussion",
    active: false,
  },
  {
    title: "Knowledge",
    description:
      "Thư viện kiến thức typology được trình bày có hệ thống và có nguồn.",
    href: "/knowledge",
    active: false,
  },
  {
    title: "Statistics",
    description:
      "Khám phá dữ liệu và các thống kê tổng hợp từ hệ thống.",
    href: "/statistics",
    active: false,
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "48px 20px 80px",
        background: "#f7f6f2",
        color: "#1c1c1c",
      }}
    >
      <div
        style={{
          width: "min(1100px, 100%)",
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: 48 }}>
          <p
            style={{
              margin: "0 0 10px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            MOSAIC
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(48px, 10vw, 92px)",
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
            }}
          >
            Personality
            <br />
            in pieces.
          </h1>

          <p
            style={{
              maxWidth: 650,
              margin: "24px 0 0",
              fontSize: 17,
              lineHeight: 1.7,
              opacity: 0.7,
            }}
          >
            Mosaic là một nền tảng khám phá tính cách theo hướng
            có hệ thống, nơi nhiều mảnh ghép khác nhau cùng tạo nên
            một bức tranh về cách mỗi người suy nghĩ, cảm nhận và
            tương tác.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: 24,
                minHeight: 180,
                border: "1px solid #dedbd3",
                borderRadius: 22,
                background: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {feature.title}
                </h2>

                <p
                  style={{
                    margin: "12px 0 0",
                    fontSize: 14,
                    lineHeight: 1.6,
                    opacity: 0.65,
                  }}
                >
                  {feature.description}
                </p>
              </div>

              <div style={{ marginTop: 20 }}>
                {feature.active ? (
                  <Link
                    href={feature.href}
                    style={{
                      display: "inline-block",
                      padding: "11px 16px",
                      borderRadius: 12,
                      background: "#1c1c1c",
                      color: "#f7f6f2",
                      textDecoration: "none",
                      fontWeight: 700,
                    }}
                  >
                    Explore →
                  </Link>
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      opacity: 0.42,
                    }}
                  >
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
