export default function ArticleStyles() {
  const HeaderBase = `
    line-height: 1.5;
    font-weight: bold;
  `;

  return (
    <style>{`
  img {
    width: 580px;
    margin: auto;
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    border-radius: 0.3rem;
    max-width: 100%;
  }

  h1 {
    font-size: 1.6rem;
    margin-top: 1.2em;
    margin-bottom: 0.8em;
    ${HeaderBase}
  }

  h2 {
    font-size: 1.2rem;
    margin-top: 1.2em;
    margin-bottom: 0.8em;
    ${HeaderBase}
  }

  p {
    font-size: 17px;
    color: rgb(var(--foreground-rgb-light));
    line-height: 1.75;
  }

  @media (max-width:640px) {
    img {
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 1.4rem;
      margin-bottom: 0.8em;
      margin-top: 1em;
    }

    h2 {
      font-size: 1.1rem;
      margin-top: 1em;
      margin-bottom: 0.8em;
    }
    
    p {
      font-size: 14px;
    }
  }
`}</style>
  );
}
