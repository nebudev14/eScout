declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        DATABASE_URL: string;
        SECRET: string;
        'NEXT_PUBLIC_DOMAIN': string;
      }
    }
  }

  export {}
