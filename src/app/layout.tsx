import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: false,
  interactiveWidget: "resizes-content",
  viewportFit: "cover",
  themeColor: "#fbf7ef",
  colorScheme: "light",
};

const BASE = "/museum/physics";
const SITE_URL = "https://easi.pivotventures.tech/museum/physics";
const SITE_NAME = "EASI Physics";
const SITE_TITLE = "EASI Physics — Interactive 3D Physics Lab";
const SITE_DESCRIPTION =
  "Interactive 3D physics experiments for EASI classrooms. Pendulum, projectile motion, waves, circuits, orbits, and more.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "EASI Physics",
    "science museum",
    "virtual experiments",
    "STEM education",
    "physics",
    "3D",
    "interactive",
    "pendulum simulation",
    "projectile motion",
    "physics lab",
  ],
  authors: [{ name: "Pivot Ventures · EASI" }],
  creator: "Pivot Ventures · EASI",
  publisher: "Pivot Ventures · EASI",
  category: "Education",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: [{ url: `${BASE}/favicon.svg`, type: "image/svg+xml" }],
  },
  manifest: `${BASE}/manifest.json`,
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "EducationalApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Pivot Ventures · EASI",
    url: "https://easi.pivotventures.tech",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href={`${BASE}/favicon.svg`} type="image/svg+xml" />
        <link rel="manifest" href={`${BASE}/manifest.json`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="m-0 p-0 light">{children}</body>
    </html>
  );
}
