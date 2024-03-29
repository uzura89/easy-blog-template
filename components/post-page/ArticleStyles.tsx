export default function ArticleStyles() {
  const HeaderBase = `
    line-height: 1.5em;
    font-weight: bold;
  `;

  return (
    <style>{`
  .article  img {
    margin: auto;
    border-radius: 0.3rem;
    max-width: 100%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: 665px;
  }

  .article h1 {
    font-size: 1.8rem;
    ${HeaderBase}
  }

  .article h2 {
    font-size: 1.45rem;
    ${HeaderBase}
  }

  .article p {
    font-size: 17px;
    color: rgb(var(--foreground-rgb-light));
    line-height: 1.75;
  }

  .article li {
    margin-bottom: 0.5em;
  }

  .article a {
    color: rgb(var(--link-rgb));
    text-decoration: underline;
  }

  .article .ql-align-center {
    text-align: center;
  }

  .article .ql-size-small {
    font-size: 0.8rem;
    color: rgb(var(--foreground-rgb-lighter));
  }

  @media (max-width:640px) {
    .article h1 {
      font-size: 1.4rem;
    }

    .article h2 {
      font-size: 1.1rem;
    }
  
    .article img {
      max-height: 395px;
    }
  }
`}</style>
  );
}
