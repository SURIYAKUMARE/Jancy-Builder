import { getHeroConfig } from "@/lib/config";
import HomePageClient from "@/components/HomePageClient";

export const revalidate = 0; // Fresh config on reload

export default function HomePage() {
  const initialConfig = getHeroConfig();

  return <HomePageClient initialConfig={initialConfig} />;
}
