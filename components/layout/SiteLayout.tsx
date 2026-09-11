import BrandMain from "@/components/layout/BrandMain";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <BrandMain>{children}</BrandMain>
      <Footer />
    </div>
  );
}
