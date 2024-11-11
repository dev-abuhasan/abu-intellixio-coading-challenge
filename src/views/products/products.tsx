"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePathname, useRouter } from "next/navigation";

type SearchParams = { [key: string]: string | string[] | undefined };
interface ProductsProps {
  searchParams: SearchParams;
}

export const Products: React.FC<ProductsProps> = ({ searchParams }) => {
  const router = useRouter();
  const pathName = usePathname();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  useEffect(() => {
    if (searchParams?.['product-id']) {
      const currentProduct = paginatedProducts.find(product => product.id === searchParams['product-id']);
      if (currentProduct) {
        setSelectedProduct(currentProduct);
      } else {
        setSelectedProduct(null);
      }
    } else if (selectedProduct !== null) {
      setSelectedProduct(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedProducts, searchParams]);

  const handleOpenModal = useCallback((product: Product) => {
    router.push(`${pathName}?product-id=${product.id}`);
    setSelectedProduct(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = useCallback(() => {
    router.push(`${pathName}`);
    setSelectedProduct(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
