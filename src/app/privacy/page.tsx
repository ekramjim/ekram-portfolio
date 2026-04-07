import ReadyToGetStarted from "@/app/components/shared/ReadyToGetStarted";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how we collect, use, and protect your personal information in accordance with privacy laws and regulations.",
};

const PrivacyPage = () => {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="text-center pt-16 pb-10">
          <p className="text-primary text-xl font-normal tracking-widest">
            PRIVACY POLICY
          </p>
          <h2 className="mt-2">Your privacy matters to us.</h2>
          <p className="text-black mt-4 max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal information in
            accordance with privacy laws and regulations.
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-grey p-10 rounded-4xl">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-normal text-black mb-4">
                  Introduction
                </h2>
                <p className="text-black leading-relaxed">
                  At LynkSphere, we take your privacy seriously. This privacy
                  policy describes how we collect, use, and protect your
                  personal information. LynkSphere is committed to protecting
                  your privacy and personal information. This Privacy Policy
                  explains how we collect, use, disclose, and protect your
                  personal information in accordance with the Privacy Act 1988
                  (Cth) and the Australian Privacy Principles (APPs).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-normal text-black mb-4">
                  Information We Collect
                </h2>
                <ul className="text-black leading-relaxed space-y-2">
                  <li>• Personal identification information</li>
                  <li>• Usage data and analytics</li>
                  <li>• Technical information about your device</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-normal text-black mb-4">
                  Data Security
                </h2>
                <p className="text-black leading-relaxed">
                  We implement appropriate security measures to protect your
                  personal information. These measures include encryption,
                  secure servers, and regular security assessments.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-normal text-black mb-4">
                  Your Rights
                </h2>
                <p className="text-black leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="text-black leading-relaxed space-y-2">
                  <li>• Access your personal data</li>
                  <li>• Request data correction</li>
                  <li>• Request data deletion</li>
                  <li>• Withdraw consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-normal text-black mb-4">
                  Contact Us
                </h2>
                <p className="text-black leading-relaxed">
                  If you have any questions about our privacy policy, please
                  contact us at{" "}
                  <a
                    href="mailto:privacy@lynksphere.com"
                    className="text-primary hover:underline"
                  >
                    privacy@lynksphere.com
                  </a>
                </p>
              </section>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <p className="text-black text-sm">
                  Last updated: January 5, 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Get in Touch Section */}
        <ReadyToGetStarted />
      </div>
    </main>
  );
};

export default PrivacyPage;
