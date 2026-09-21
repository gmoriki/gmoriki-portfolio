// Preserve incoming links from the previous GitHub Pages SPA.
const legacyWorksAnchors: Record<string, string> = {
  "section-overview": "main",
  "section-featured": "governance",
  "section-content": "journal",
  "section-map": "field",
  "section-log": "index",
};

export function restoreLegacyLocation(): boolean {
  if (
    /^\/(?:index\.html)?$/.test(location.pathname) &&
    location.hash === "#expertise"
  ) {
    history.replaceState(
      null,
      "",
      location.pathname + location.search + "#about"
    );
  }
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  if (location.pathname === "/" && redirect) {
    let destination: URL;
    try {
      destination = new URL(redirect, location.origin);
    } catch {
      // A malformed legacy URL must not prevent the home page from rendering.
      return false;
    }
    if (
      destination.origin === location.origin &&
      /^\/(works|profile)\/?$/.test(destination.pathname)
    ) {
      params.delete("redirect");
      destination.pathname = destination.pathname.replace(/\/?$/, "/");
      for (const [name, value] of params) {
        if (!destination.searchParams.has(name))
          destination.searchParams.append(name, value);
      }
      destination.hash ||= location.hash;
      location.replace(
        destination.pathname + destination.search + destination.hash
      );
      return true;
    }
  }
  if (/^\/works(?:\/|\/index\.html)?$/.test(location.pathname)) {
    const current = location.hash.slice(1);
    const replacement = legacyWorksAnchors[current];
    if (replacement)
      history.replaceState(
        null,
        "",
        location.pathname + location.search + "#" + replacement
      );
  }
  return false;
}
