// src/types/vite-env.d.ts

interface ImportMetaEnv {
    [key: string]: any;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    /**
     * Vite-specific experimental feature.
     * @see https://vitejs.dev/guide/features.html#glob-import
     */
    glob: typeof import('vite').meta.glob;
}
