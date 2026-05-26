import {useEffect, useMemo, useState} from "react";

import api from "../api/api";

import ProductList from "../components/product/ProductList";
import ProductDetail from "../components/product/ProductDetail";
import CreateProductForm from "../components/product/CreateProductForm";

export default function Products() {
  const [view, setView] = useState("list");

  const [selected, setSelected] = useState(null);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("all");

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/product/get-products");
      console.log(res.data);
      setProducts(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = search.toLowerCase();

      const matchSearch =
        p.productName?.toLowerCase().includes(q) ||
        p.productCode?.toLowerCase().includes(q);

      const matchStatus =
        filterStatus === "all" || p.complianceStatus === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [products, search, filterStatus]);
  if (view === "detail") {
    return <ProductDetail product={selected} onBack={() => setView("list")} />;
  }

  if (view === "create") {
    return (
      <CreateProductForm
        onSuccess={() => {
          fetchProducts();
          setView("list");
        }}
        onCancel={() => setView("list")}
      />
    );
  }

  return (
    <ProductList
      products={filteredProducts}
      loading={loading}
      search={search}
      setSearch={setSearch}
      filterStatus={filterStatus}
      setFilterStatus={setFilterStatus}
      onCreate={() => setView("create")}
      onSelect={(product) => {
        setSelected(product);
        setView("detail");
      }}
    />
  );
}
