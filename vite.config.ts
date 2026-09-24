import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "node:path";
import { cpSync, existsSync } from "node:fs";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [
    react(),
    {
      // Preload the two fonts used above the fold so the hero doesn't reflow on swap
      name: "preload-hero-fonts",
      apply: "build",
      transformIndexHtml: {
        order: "post",
        handler(_html, ctx) {
          const wanted = [/cormorant-garamond-latin-300-normal-.*\.woff2$/, /dm-sans-latin-wght-normal-.*\.woff2$/];
          return Object.keys(ctx.bundle ?? {})
            .filter((file) => wanted.some((re) => re.test(file)))
            .map((file) => ({
              tag: "link",
              attrs: { rel: "preload", as: "font", type: "font/woff2", href: base + file, crossorigin: "" },
              injectTo: "head-prepend" as const,
            }));
        },
      },
    },
    {
      // The CV and certificates live at the repo root (not /public) so the CV
      // can be swapped in place; copy them into the build so the links resolve.
      name: "copy-root-documents",
      apply: "build",
      closeBundle() {
        for (const item of ["Constança_Cunha_CV.pdf", "Certificates"]) {
          const from = resolve(__dirname, item);
          if (existsSync(from)) cpSync(from, resolve(__dirname, "out", item), { recursive: true });
        }
      },
    },
    AutoImport({
      imports: [
        {
          react: [
            "React",
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
      ],
      dts: true,
    }),
  ],
  base,
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    outDir: "out",
    rollupOptions: {
      output: {
        // React + router change rarely: keep them in their own long-cacheable chunk
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});