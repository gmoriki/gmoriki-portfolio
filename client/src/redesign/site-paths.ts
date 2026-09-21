// Only the public build defines this flag. Study previews keep their own URLs.
export const isPublicSite = import.meta.env.VITE_PUBLIC_SITE === "true";

export const sitePaths = isPublicSite
  ? { home: "/", works: "/works/", profile: "/profile/" }
  : {
      home: "/redesign.html",
      works: "/works-study.html",
      profile: "/profile-study.html",
    };
