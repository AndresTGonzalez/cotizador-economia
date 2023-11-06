import Product from "@/models/Product";
import { Card, CardHeader, Image } from "@nextui-org/react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <div className="w-56">
      <Card
        className="col-span-12 sm:col-span-4 h-[300px] hover:shadow-xl"
        isPressable
        isHoverable
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">
            {product.description}
          </p>
          <h4 className="text-white font-medium text-large">{product.name}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover"
          src="/login_image.jpg"
          style={{ filter: "brightness(0.5)" }}
        />
      </Card>
    </div>
  );
}
