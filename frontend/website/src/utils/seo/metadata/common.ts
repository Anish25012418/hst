import { Metadata } from "next";

/**
 * @icons
 * The icons for the document. Defaults to rel="icon".
 *
 * @see https://developer.mozilla.org/docs/Web/HTML/Attributes/rel#attr-icon
 * @example
 * ```tsx
 * "https://example.com/icon.png"
 * <link rel="icon" href="https://example.com/icon.png" />
 *
 * { icon: "https://example.com/icon.png", apple: "https://example.com/apple-icon.png" }
 * <link rel="icon" href="https://example.com/icon.png" />
 * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
 *
 * [{ rel: "icon", url: "https://example.com/icon.png" }, { rel: "apple-touch-icon", url: "https://example.com/apple-icon.png" }]
 * <link rel="icon" href="https://example.com/icon.png" />
 * <link rel="apple-touch-icon" href="https://example.com/apple-icon.png" />
 * ```
 * icons?: null | IconURL | Array<Icon> | Icons;
 */
export const icons_metadata: Metadata = {
  icons: {
    icon: {
      // url: "/image/favicon.ico",
      // type: "image/x-icon",
      url: "/image/hst-logo.png",
      type: "image/png",
    },
    // shortcut: { url: "/image/favicon.ico", type: "image/x-icon" },
    shortcut: {
      url: "/image/hst-logo.png",
      type: "image/png",
    },
  },
};

/**
 * @authors
 * The authors of the document.
 * @example
 * ```tsx
 * [{ name: "Next.js Team", url: "https://nextjs.org" }]
 *
 * <meta name="author" content="Next.js Team" />
 * <link rel="author" href="https://nextjs.org" />
 * ```
 *  authors?: null | Author | Array<Author>;
 */
export const authors_metadata: Metadata = {
  authors: [
    { url: "https://github.com/udip-rai", name: "Udip Rai" },
    { url: "https://github.com/sthapityashu", name: "Yashu Sthapit" },
  ],
};
