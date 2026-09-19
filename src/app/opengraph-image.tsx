import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #59c1f0 0%, #cdeeff 55%, #fff8ec 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 170,
            height: 170,
            borderRadius: "50%",
            background: "#ffc02e",
            border: "10px solid #a91f1d",
            fontSize: 90,
            marginBottom: 28,
          }}
        >
          🚒
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            color: "#e0302d",
            letterSpacing: -2,
          }}
        >
          ZIDAAN
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            color: "#1b2436",
            letterSpacing: 6,
            marginTop: 4,
          }}
        >
          2 THE RESCUE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#1b2436",
            marginTop: 30,
          }}
        >
          Join the Rescue Crew · October 31st
        </div>
      </div>
    ),
    { ...size }
  );
}
