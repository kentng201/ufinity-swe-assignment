function requireEnv(env: any): string {
  if (typeof window === "undefined" && !env) {
    throw new Error(
      "[MISSING ENV VARIABLE] - please check your .env.local or .env file!",
    )
  }

  return env as string
}

const ENV = {
  /**
   * The host of the backend API.
   */
  API_BASE_URL: requireEnv(import.meta.env.VITE_API_BASE_URL),
}

export default ENV