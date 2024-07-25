/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportBaseUrlEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportXApiKey {
  readonly VITE_X_API_KEY: string;
}
