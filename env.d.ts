declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        DATABASE_URL: string;
        SECRET: string;
        VERCEL_URL: string;
      }
    }
  }

  export {}
