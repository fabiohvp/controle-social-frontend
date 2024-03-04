type Env = {
  apiGoogleMapsKey: string;
  apiUrl: string;
  apiVersion: string;
  process: "build" | "dev" | "production";
  vercelUrl: string;
};

export const ENV = {
  apiGoogleMapsKey: process.env.API_GOOGLE_MAPS_KEY,
  apiUrl: `${process.env.API_PROTOCOL}://${process.env.API_URL}/api`,
  apiVersion: process.env.API_VERSION,
  process: process.env.npm_lifecycle_event,
  vercelUrl: `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api`,
} as Env;
