import AboutUs from "@/app/components/Home/AboutUs";
import ReadyToGetStarted from "@/app/components/shared/ReadyToGetStarted";

const AboutPage = () => {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto max-w-7xl px-4 space-y-20">
        <AboutUs showHeader={true} />
        <ReadyToGetStarted />
      </div>
    </main>
  );
};

export default AboutPage;
