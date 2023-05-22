export default function ArticleStyles() {
  const HeaderBase = `
    line-height: 1.5;
    font-weight: bold;
  `;

  return (
    <style>{`
  .article  img {
    width: 580px;
    margin: auto;
    margin-bottom: 1.8rem;
    margin-top: 1.8rem;
    border-radius: 0.3rem;
    max-width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .article h1 {
    font-size: 1.6rem;
    margin-top: 1.2em;
    margin-bottom: 0.8em;
    ${HeaderBase}
  }

  .article h2 {
    font-size: 1.2rem;
    margin-top: 1.2em;
    margin-bottom: 0.8em;
    ${HeaderBase}
  }

  .article p {
    font-size: 17px;
    color: rgb(var(--foreground-rgb-light));
    line-height: 1.75;
  }

  .article a {
    color: rgb(var(--link-rgb));
    text-decoration: underline;
  }

  @media (max-width:640px) {
    .article img {
      margin-bottom: 1.5rem;
    }

    .article h1 {
      font-size: 1.4rem;
      margin-bottom: 0.8em;
      margin-top: 1em;
    }

    .article h2 {
      font-size: 1.1rem;
      margin-top: 1em;
      margin-bottom: 0.8em;
    }
    
    .article p {
      font-size: 14px;
    }
  }
`}</style>
  );
}
