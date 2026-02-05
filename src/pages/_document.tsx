import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="mx-auto min-h-screen w-full max-w-280 bg-neutral-50 px-8 antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
