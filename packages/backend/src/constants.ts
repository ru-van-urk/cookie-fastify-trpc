export const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
