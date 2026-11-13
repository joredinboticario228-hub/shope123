# ByteHaven: Computer Shop SPA

ByteHaven is a single-page React application that works as an online computer shop. It loads live product data from a public REST API and lets shoppers search, filter, sort, page through results, view product details, and save favorites that stay after a page reload.

## Features

- **Live catalog**: Laptops, tablets, smartphones, and accessories fetched on load with `fetch` and `async/await`.
- **Search**: Instant keyword filtering by product name, brand, or tag.
- **Category filter and sorting**: Filter by category and sort by featured order, price (low to high or high to low), top rating, or name.
- **Pagination**: 12 products per page, with page state kept in the address bar so results survive refreshes and back navigation.
- **Product details** (`/product/:id`): Image gallery, discounted pricing, stock status, specifications, and customer reviews.
- **Favorites** (`/favorites`): Save products to a watchlist stored in the browser's localStorage.
- **Loading, error, and empty states**: Skeleton placeholders while loading, a retry button when the request fails, and friendly messages when nothing matches.

## External API

- Product data: [DummyJSON Products API](https://dummyjson.com/docs/products). The app requests `https://dummyjson.com/products?limit=0` and keeps the computer-related categories.
- No API key is required.

## Tech Stack

- React 18 with TypeScript
- Vite
- React Router (client-side routing)
- Tailwind CSS
- Lucide React (icons)

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Running the app

```bash
npm run dev
```

Open the local address printed in the terminal (usually `http://localhost:5173`).

### Other scripts

```bash
npm run build      # Production build
npm run preview    # Preview the production build
npm run lint       # Lint the project
npm run typecheck  # Type-check the application code
```

## Environment Variables

The product API is public, so the app runs without a `.env` file. If you switch to an API that requires a key, create a `.env` file in the project root, add the key there (for example `VITE_API_KEY=your_key_here`), and read it with `import.meta.env.VITE_API_KEY`. Never commit `.env` to GitHub.

## Project Structure

```
src/
  components/
    catalog/     Search bar, filters, product cards, grid, pagination
    common/      Shared pieces: rating stars, favorite button, badges, banners, empty state
    layout/      Site header and page layout
    product/     Product gallery and review list
  context/       Product data and favorites state shared across pages
  lib/           API request, catalog filtering and sorting, formatting helpers
  pages/         Shop (home), product details, favorites
  types/         Product data types
```

## Git Workflow

- The `main` branch is protected. All work happens on feature branches such as `feature/api-fetch`, `feature/search-bar`, and `feature/favorites`.
- Each change is merged through a Pull Request.
- Commit messages use conventional prefixes: `feat:`, `fix:`, `style:`, `docs:`.

## Team Contributions

| Member | Role | Main contributions |
| --- | --- | --- |
| [Member 1 name] | API and data layer | Product fetching, types, loading and error handling (`feature/api-fetch`) |
| [Member 2 name] | Search and filtering | Search bar, category filter, sorting, pagination (`feature/search-bar`) |
| [Member 3 name] | Details and favorites | Product detail page, favorites with localStorage, README (`feature/favorites`) |

Update this table with the real names and contributions before submission.
