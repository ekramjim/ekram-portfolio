"use client";
import Link from "next/link";
import FadeInView from "@/app/components/Common/FadeInView";

const ReadyToGetStarted = () => {
  return (
    <FadeInView className="pb-12 pt-16">
      <h3 className="text-4xl font-normal mb-4">Ready to Get Started?</h3>
      <p className="text-black mb-8 max-w-2xl">
        Have questions about your next project? Want to discuss how we can help
        bring your ideas to life? Let's start a conversation.
      </p>
      <Link
        href="/#Contact"
        className="inline-block bg-primary text-white px-8 py-4 rounded-full hover:bg-black transition-colors duration-300 font-normal"
      >
        Get in Touch
      </Link>
    </FadeInView>
  );
};

export default ReadyToGetStarted;
