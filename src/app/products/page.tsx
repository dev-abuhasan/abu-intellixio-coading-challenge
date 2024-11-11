import { Products } from "@/views/products";

type SearchParams = { [key: string]: string | string[] | undefined };
interface ProductsRootProps {
  searchParams: SearchParams;
}

export default function ProductsRoot({ searchParams }: ProductsRootProps) {
  return <Products searchParams={searchParams} />;
}
