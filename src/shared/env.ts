type Env = {
  apiUrl: string;
  process: "build" | "dev" | "production";
  vercelUrl: string;
};

export const ENV = {
  apiUrl: `${process.env.API_PROTOCOL}://${process.env.API_URL}/api`,
  process: process.env.npm_lifecycle_event,
  vercelUrl: `${process.env.VERCEL_PROTOCOL}://${process.env.VERCEL_URL}/api`,
} as Env;
