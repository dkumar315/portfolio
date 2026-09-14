import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/metadata";

export function StructuredData() {
  const baseUrl = getSiteUrl().toString().replace(/\/$/, "");

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: site.name,
        url: baseUrl,
        jobTitle: site.role,
        sameAs: [site.github, site.linkedin],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "UNSW Sydney",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: `${site.name} Portfolio`,
        description: site.description,
        author: {
          "@id": `${baseUrl}/#person`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
