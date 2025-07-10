import React, { useEffect, useState, useRef, useCallback } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
}

export default function Offers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectionArr, setSelectionArr] = useState<number[]>([]);
  const skipRef = useRef(0);
  const loadingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    setLoading(true);
    loadingRef.current = true;
    try {
      const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skipRef.current}`);
      const data = await res.json();
      if (data.products && data.products.length > 0) {
        setProducts(prev => [...prev, ...data.products]);
        skipRef.current += 10;
        setSkip(skipRef.current);
        if (data.products.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [hasMore]);

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        scrollRef.current &&
        scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 100 &&
        !loadingRef.current &&
        hasMore
      ) {
        fetchProducts();
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, [fetchProducts, hasMore]);

  const handleCheckbox = (id: number) => {
    setSelectionArr(arr =>
      arr.includes(id) ? arr.filter(item => item !== id) : [...arr, id]
    );
  };

  return (
    <div ref={scrollRef} className="p-6 overflow-y-auto h-[calc(100vh-65px)] md:h-[calc(100vh-85px)]">
      <h1 className="text-2xl font-semibold mb-4">Offers</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 flex flex-col gap-2 bg-white shadow">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{product.title}</h2>
              <input
                type="checkbox"
                checked={selectionArr.includes(product.id)}
                onChange={() => handleCheckbox(product.id)}
              />
            </div>
            <div className="text-sm text-gray-500 mb-1">{product.category}</div>
            <div className="text-gray-700">{product.description}</div>
            <div className="flex gap-4 mt-2">
              <span className="font-semibold">${product.price}</span>
              <span className="text-green-600">{product.discountPercentage}% off</span>
              <span className="text-yellow-500">⭐ {product.rating}</span>
            </div>
            <div className="text-xs text-gray-400">Stock: {product.stock}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {product.tags.map(tag => (
                <span key={tag} className="bg-gray-100 rounded px-2 py-0.5 text-xs text-gray-600">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="text-center py-4">Loading...</div>}
      {!hasMore && <div className="text-center py-4 text-gray-400">No more products.</div>}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Selected Product IDs:</h2>
        <div className="flex flex-wrap gap-2">
          {selectionArr.map(id => (
            <span key={id} className="bg-blue-100 px-2 py-0.5 rounded text-blue-700 text-xs">{id}</span>
          ))}
          {selectionArr.length === 0 && <span className="text-gray-400">No products selected.</span>}
        </div>
      </div>
    </div>
  );
}