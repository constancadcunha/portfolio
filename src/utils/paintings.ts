/** Background paintings: spring blossoms (light) and Van Gogh's Starry Night (dark). */
export const FLOWER_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/6e8c403a-cbbb-4ffb-9b5c-046a895a4145_44754-O4E303.jpg?v=7bc895d19fd86036061a48ea2d24fbcb';

export const STARRY_NIGHT_URL =
  'https://storage.readdy-site.link/project_files/e3f47e67-a40c-4e43-bb07-7051efd37d8b/ee9938bb-db17-4424-ae21-3295d23f431b_Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg.webp?v=e5c1f82b131465dd1fba7e27842ec222';

export function paintingUrl(isDark: boolean): string {
  return isDark ? STARRY_NIGHT_URL : FLOWER_URL;
}
