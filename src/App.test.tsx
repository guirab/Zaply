import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Produto 1",
          price: 100,
          image: "img.jpg",
          brand: "Marca 1",
          category: "Categoria 1",
        },
      ]),
  })
) as jest.Mock;

describe("App Component", () => {
  test("renders App component and checks for Add Product button and search bar", async () => {
    render(<App />);

    const addButton = screen.getByText(/Adicionar Produto/i);
    expect(addButton).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Pesquisar.../i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.click(addButton);

    const saveButton = await screen.findByText(/Salvar/i);
    expect(saveButton).toBeInTheDocument();
  });
});
