/** Somente avaliações verificadas, autorizadas e com origem consultável. */
export interface VerifiedReview {
  name: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  publishedAt: string;
  sourceUrl: string;
}
