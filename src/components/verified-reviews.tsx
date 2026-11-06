import type { VerifiedReview } from "@/types/reviews";
/** Sem avaliações fornecidas, este componente não fabrica prova social. */
export default function VerifiedReviews({
  reviews = [],
}: {
  reviews?: VerifiedReview[];
}) {
  if (reviews.length === 0) return null;
  return (
    <div className="service-grid">
      {reviews.map((review) => (
        <article className="notice" key={review.sourceUrl}>
          <h3>{review.name}</h3>
          <p>{review.text}</p>
          <p>
            Nota: {review.rating} de 5 ·{" "}
            <time dateTime={review.publishedAt}>
              {new Intl.DateTimeFormat("pt-BR", {
                timeZone: "America/Fortaleza",
              }).format(new Date(review.publishedAt))}
            </time>
          </p>
          <a
            className="text-button"
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar avaliação na origem ↗
          </a>
        </article>
      ))}
    </div>
  );
}
