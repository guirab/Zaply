import React, { useState, ChangeEvent, FormEvent } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  brand: string;
  category: string;
}

interface EditProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onRemove: (id: number) => void;
  onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  onSave,
  onCancel,
  onRemove,
}) => {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: 0,
      image: "",
      name: "",
      price: 0,
      brand: "",
      category: "",
    }
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white border border-gray-300 rounded-lg"
    >
      <h3 className="text-xl font-bold mb-4">
        {product ? "Editar Produto" : "Adicionar Produto"}
      </h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="image">
          Imagem URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="price">
          Preço
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="brand">
          Marca
        </label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="category">
          Categoria
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="flex justify-between">
        {product && (
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
          >
            Remover
          </button>
        )}
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {product ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditProductForm;
