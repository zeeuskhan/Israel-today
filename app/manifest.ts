import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Israel Today — חדשות ישראל",
    short_name: "Israel Today",
    description: "חדשות ועדכונים מישראל בעברית",
    lang: "he-IL",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#10243e"
  };
}
