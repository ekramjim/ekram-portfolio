export const parseHref = (href: string) => {
  try {
    const url = new URL(
      href,
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost",
    );
    return { pathname: url.pathname, hash: url.hash?.replace(/^#/, "") || "" };
  } catch {
    const [path, hash] = href.split("#");
    return { pathname: path || "/", hash: hash || "" };
  }
};

// Scroll to an element ID while accounting for the sticky header height.
export const scrollToHash = (hash: string) => {
  const element = document.getElementById(hash);
  if (!element) return false;

  const header = document.querySelector("header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const cushion = Math.max(headerHeight - 16, 0);
  const offsetTop = element.getBoundingClientRect().top + window.scrollY - cushion;

  window.scrollTo({ top: offsetTop, behavior: "smooth" });
  return true;
};
