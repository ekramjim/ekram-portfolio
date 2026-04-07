import ProductsList from "@/app/components/shared/ProductsList";
import ReadyToGetStarted from "@/app/components/shared/ReadyToGetStarted";

const ProductsPage = () => {
  return (
    <main className="min-h-screen pt-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header Section */}
        <div className="text-center pt-16 pb-10">
          <p className="text-primary text-xl font-normal tracking-widest">
            PRODUCTS
          </p>
          <h2 className="mt-2">Our featured works.</h2>
          <p className="text-black mt-4 max-w-2xl mx-auto">
            Explore our portfolio of innovative products and solutions designed
            to help businesses grow and succeed in the digital landscape.
          </p>
        </div>

        {/* Products Section */}
        <ProductsList />

        {/* Get in Touch Section */}
        <ReadyToGetStarted />
      </div>
    </main>
  );
};

export default ProductsPage;