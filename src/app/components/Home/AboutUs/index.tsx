"use client";

import FadeInView from "@/app/components/Common/FadeInView";

interface AboutUsProps {
  showHeader?: boolean;
}

const Aboutus: React.FC<AboutUsProps> = ({ showHeader = false }) => {
  return (
    <section className="overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4">
        {showHeader && (
          <FadeInView>
            <div className="pt-16 pb-10">
              <p className="text-primary text-xl font-normal tracking-widest">
                ABOUT US
              </p>
              <h2 className="mt-2">Who we are and what we do.</h2>
              <p className="text-gray-500 mt-4 max-w-2xl">
                We are a team of passionate innovators dedicated to building
                products that help businesses thrive in the digital world.
              </p>
            </div>
          </FadeInView>
        )}
      </div>
    </section>
  );
};

export default Aboutus;
