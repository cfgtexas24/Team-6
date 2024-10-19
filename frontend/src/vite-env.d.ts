/// <reference types="vite/client" />

// Typings for the .env variables
interface ImportMetaEnv {
  readonly VITE_API_ADDRESS: string;
  readonly VITE_CHAT_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
