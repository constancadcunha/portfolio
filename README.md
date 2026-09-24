# Constança Cunha — Portfolio

Design engineer portfolio: I design in Figma and ship in code.

**Live:** https://constancadcunha.github.io/portfolio/

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS
- Deployed to GitHub Pages by `.github/workflows/deploy-pages.yml` on every push to `main`

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs to out/ with the /portfolio/ base path
```

## Content

- Projects: `src/pages/home/components/ProjectsSection.tsx`
- Experience, skills, education: `src/pages/home/components/AboutSection.tsx`
- Images: `public/images/` (WebP)
- CV: `Constança_Cunha_CV.pdf` at the repo root. Replace the file in place; the build copies it into the site.
