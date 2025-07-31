# Book Tracker

Book Tracker is a React app that lets users log in, add, view, edit, and delete books from their personal collection. It connects to a custom backend API to manage and persist book data.

## Features

- User authentication (login & signup)
- Add new books to your collection
- View a list of your added books (with caching and auto-refetching)
- Edit or delete existing books
- Real-time data fetching with React Query (Tanstack Query)
- Responsive UI styled with Tailwind CSS and DaisyUI

## Tech Stack

- React 19
- Vite for build and dev server
- React Router DOM for routing
- Tanstack React Query for data fetching and caching
- Tailwind CSS + DaisyUI for styling
- JWT for authentication handling
- Zod for validation

## Getting Started

### Prerequisites

- Node.js (recommended version: latest LTS)
- API base URL: https://books-api-1jwf.onrender.com

### Environment Variables

Create a `.env` file at the root of the project with the following:

```bash
VITE_BOOK_API_BASE_URL=https://books-api-1jwf.onrender.com
```

## Installation
```bash
# 1. Clone the repo
git clone https://github.com/Achra-f/book-tracker.git
cd book-tracker

# 2. Install dependencies
npm install

# 3. Start the development server:
npm run dev
```

## Usage

1. Open the app in your browser.
2. Sign up or log in with your credentials
3. Add new books by providing title, author, etc.
4. View your book list — it's automatically cached with TanStack React Query
5. Edit or delete entries as needed

## Project Status

This project is under active development. Core features are functional, but additional improvements and refinements are planned.

