declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV_NEXT: "development" | "production";
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
