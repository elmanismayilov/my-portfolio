import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { isLocale } from "@/lib/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <Header locale={lang} />
      <main>
        <Hero locale={lang} />
        <Projects locale={lang} />
        <About locale={lang} />
      </main>
      <Footer locale={lang} />
    </>
  );
}
