# Digital Store

Loja virtual responsiva feita com React e Vite, baseada nas referências em `doc/layout`. A aplicação contém página inicial, catálogo com busca/filtros/ordenação e página de detalhes do produto.

## Executar localmente

Requer Node.js e npm.

```bash
npm install
npm run dev
```

O Vite informa no terminal o endereço local para abrir no navegador. Para gerar a versão de produção, execute `npm run build`; para visualizar essa versão, use `npm run preview`.

## Catálogo e API

A interface tenta carregar produtos de `http://localhost:3000/v1/products`. Se a API estiver indisponível ou não retornar produtos, usa o catálogo de demonstração em `src/App.jsx`. Imagens de demonstração e logotipos ficam em `public/` e `assets/`.

## Páginas

- `/` — início, banner e coleções em destaque.
- `/products` — catálogo com busca, filtros e ordenação.
- `/product/:id` — detalhes, galeria, seleção de tamanho e botão para adicionar à sacola.
