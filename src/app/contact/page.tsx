import ContactForm from "@/app/components/shared/ContactForm";

const ContactPage = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact Us" },
  ];

  return (
    <main className="min-h-screen pt-24">
      <section className="bg-joinus py-16">
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPage;
