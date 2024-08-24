import React, { useState } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
  category: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit }) => {
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    setSortField(field);
    setSortDirection((prevDirection) =>
      prevDirection === "asc" ? "desc" : "asc"
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortField === "") return 0;
    if (sortField === "price") {
      return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
    }
    const aValue = a[sortField as keyof Product]?.toString().toLowerCase();
    const bValue = b[sortField as keyof Product]?.toString().toLowerCase();

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="overflow-x-auto overflow-y-scroll h-[calc(100%-35.99px)]">
      <div className="relative">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-teal-600 text-white sticky top-0 z-10">
            <tr className="text-left">
              <th className="py-3 px-4">Imagem</th>
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Nome
                {sortField === "name" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Preço
                {sortField === "price" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => handleSort("brand")}
              >
                Marca
                {sortField === "brand" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th
                className="py-3 px-4 cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Categoria
                {sortField === "category" && (
                  <span>{sortDirection === "asc" ? " ▲" : " ▼"}</span>
                )}
              </th>
              <th className="py-3 px-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr
                key={product.id}
                className="even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="py-3 px-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.price} USD</td>
                <td className="py-3 px-4">{product.brand}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => onEdit(product)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
