import React, { useState, useEffect } from "react";
import ProductTable from "./components/productTable";
import EditProductForm from "./components/editProduct";
import Modal from "./components/modal";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
  category: string;
}

const App: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchParams, setSearchParams] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchParams) {
      setProducts(
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchParams.toLowerCase())
        )
      );
    } else {
      setProducts(allProducts);
    }
  }, [searchParams, allProducts]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async (product: Product) => {
    try {
      if (product.id === 0) {
        // Novo produto (adicionando)
        const response = await fetch("http://localhost:3001/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const newProduct = await response.json();
        setAllProducts([...allProducts, newProduct]);
        setProducts([...allProducts, newProduct]);
      } else {
        // Produto existente (editando)
        const response = await fetch(
          `http://localhost:3001/api/products/${product.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const updatedProducts = allProducts.map((p) =>
          p.id === product.id ? product : p
        );
        setAllProducts(updatedProducts);
        setProducts(updatedProducts);
      }

      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedProducts = allProducts.filter((p) => p.id !== productId);
      setAllProducts(updatedProducts);
      setProducts(updatedProducts);
      setEditingProduct(null);
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: 0,
      image: "",
      name: "",
      price: 0,
      brand: "",
      category: "",
    });
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <h1 className="text-3xl font-bold m-4 text-center">Gestão de Produtos</h1>

      <div className="w-full flex items-center justify-between space-x-2 px-2">
        <button
          className="bg-green-500 text-white text-nowrap max-w-[154px] py-1 px-2 rounded hover:bg-green-600"
          onClick={handleAddProduct}
        >
          Adicionar Produto
        </button>
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          placeholder="Pesquisar..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <ProductTable products={products} onEdit={handleEdit} />

      <Modal isOpen={editingProduct !== null} onClose={handleCancel}>
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onRemove={handleRemove}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default App;
