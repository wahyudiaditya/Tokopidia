"use client";
import ProductCard from "@/components/products/ProductCard";
import ScrollPagetoTop from "@/components/products/ScrollPagetoTop";
import ScrollToTop from "@/components/ScrollToTop";
import { ProductTypeWithId } from "@/types/productTypes";
import { BASE_URL } from "@/utils/baseUrl";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebouncedCallback } from "use-debounce";

export default function Products() {
  const [products, setProducts] = useState<ProductTypeWithId[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [q, setQ] = useState("");

  const handleSearch = useDebouncedCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/products?q=${q}&page=${page}`);

    const data = await res.json();

    setProducts(data);
    if (data.length < 15) {
      setHasMore(false);
      return;
    }
    setPage(page + 1);
  }, 1000);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
    handleSearch();
  }, [q]);

  const fetchProducts = async () => {
    if (page > 1) {
      const res = await fetch(`${BASE_URL}/api/products?q=${q}&page=${page}`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setHasMore(true);
      setProducts((prevProducts) => [...prevProducts, ...data]);

      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container min-h-[58vh] mx-auto mt-32 lg:w-[1100px] md:w-[700px] mb-10">
      <div className="flex fixed top-16 z-10 bg-white py-4 mt-2 border-t right-0 left-0 w-[1100px] mx-auto">
        <input
          type="text"
          placeholder="Cari produk, toko, atau kategori"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-3/4 text-sm px-4 py-1 me-auto rounded-md border border-gray-300 outline-none  focus:outline-none focus:border-green-500"
        />
        <div className="pl-4 gap-2 flex w-[250px] items-center">
          <p className="text-sm font-semibold">Urutkan:</p>
          <select
            name=""
            id=""
            className="rounded-md border-gray-300 border w-full text-xs px-1 h-[33px] outline-none focus:border-green-500"
          >
            <option value="terbaru" defaultValue={"terbaru"}>
              Terbaru
            </option>
            <option value="">Harga Tertinggi</option>
            <option value="">Harga Terendah</option>
          </select>
        </div>
      </div>

      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="py-5 grid grid-cols-5 gap-5">
          {products.map((el, index) => (
            <div key={el._id.toString() + index} className="col-span-1">
              <ProductCard product={el} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
      <ScrollPagetoTop />
      <ScrollToTop />
    </div>
  );
}
