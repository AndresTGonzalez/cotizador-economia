import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";

export default function Home() {
  const products: Product[] = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    name: `Product name ${index + 1}`,
    description: `Product description ${index + 1}`,
    percent: 0,
    image: "/login_image.jpg",
  }));
  return (
    <main className="p-6 bg-white">
      <h1 className="text-3xl font-light text-neutral-800">
        Nuestros productos
      </h1>
    </main>
  );
}
