"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default function ProductCarousel({ data }: { data: Product[] }) {
  return (
    <Carousel
      className="mb-12 w-full"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link href={`/product/${product.slug}`}>
              <div className="relative mx-auto">
                <Image
                  alt={product.name}
                  src={product.banner!}
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-full"
                />
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="bg-opacity-50 invisible bg-gray-900 px-2 text-2xl text-white lg:visible">
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
