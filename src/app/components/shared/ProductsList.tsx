"use client";

import Image from "next/image";
import { FeaturedData } from "@/app/data/featuredData";
import FadeInView from "@/app/components/Common/FadeInView";

const ProductsList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-10">
      {FeaturedData.map((product, index) => (
        <FadeInView key={index} delay={index * 0.15}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-sm overflow-hidden">
                  <Image
                    src={img}
                    alt={product.heading}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <h4 className="text-lg font-normal text-black">{product.heading}</h4>
          </div>
        </FadeInView>
      ))}
    </div>
  );
};

export default ProductsList;
