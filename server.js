import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// Obtendo o diretório do arquivo atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para ler produtos do arquivo CSV
const readProductsFromCSV = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    const csvFilePath = path.resolve(__dirname, 'public/assets/products.csv'); // Usando path.resolve para obter o caminho absoluto

    fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ';', headers: ['id', 'image', 'name', 'category', 'price', 'brand'], skipEmptyLines: true }))
    .on('data', (data) => results.push(data))
      .on('end', () => {
        results.shift(); // Remover a primeira linha (cabeçalho)
        resolve(results)
      })
      .on('error', (error) => reject(error));
  });
};

let products = [];

// Ler produtos do arquivo CSV
await readProductsFromCSV().then((data) => {
  products = data;
  console.log('Produtos carregados com sucesso');
});

// Buscar produtos
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Adicionar um novo produto
app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Atualizar um produto
app.put('/api/products/:id', (req, res) => {
  const id = req.params.id;
  const index = products.findIndex(product => product.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Excluir um produto
app.delete('/api/products/:id', (req, res) => {
  const id = req.params.id;
  products = products.filter(product => product.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
