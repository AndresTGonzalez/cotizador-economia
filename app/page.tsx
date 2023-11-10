import ProductCard from "@/components/ProductCard";
import Product from "@/models/Product";

export default function Home() {
  const products: Product[] = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    name: `Product name ${index + 1}`,
    description: `Product description ${index + 1}`,
    percent: 0,
    image: "/login_image.jpg",
  }));
  return (
    <main className="bg-red-400 h-full w-screen overflow-auto">
      <div className="h-fit w-screen bg-green-400"></div>
    </main>
  );
}
