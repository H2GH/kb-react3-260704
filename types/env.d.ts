// Node.js의 최상위 객체는 global
export declare global {
  namespace NodeJS {
    // ProcessEnv = process.env
    interface ProcessEnv {
      OMDB_APIKEY: string
    }
  }
}
