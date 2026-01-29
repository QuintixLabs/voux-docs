export default function Head() {
  return (
    <>
      <link
        rel="icon"
        href="/assets/logo-dark.svg"
        media="(prefers-color-scheme: light)"
      />
      <link
        rel="icon"
        href="/assets/logo-light.svg"
        media="(prefers-color-scheme: dark)"
      />
    </>
  );
}
