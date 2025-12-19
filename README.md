# Movie Catalog

A simple SPA for browsing movies.

---

### Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Animation**: Framer Motion
- **Testing**: Vitest, React Testing Library

---

### Project Structure

The project is structured by feature and type.

```
/src
|
|-- /components       # UI components, split into common, features, and layout
|   |-- /common
|   |-- /features
|   `-- /layout
|
|-- /context          # React Context (e.g., ThemeContext)
|-- /data             # Mock data (movies.json)
|-- /hooks            # Custom hooks (e.g., useDebounce)
|-- /pages            # Page components (HomePage, MovieDetailPage)
|-- /types            # TypeScript type definitions
`-- /utils            # Utility functions (e.g., constants, cn)
```

- **`components/features`** contains components with business logic (e.g., `MovieCard`, `SearchBar`).
- **`components/common`** contains reusable, generic components (e.g., `Button`, `Skeleton`).
- **`components/layout`** contains structural components (`Header`, `Footer`).

---

### Setup & Running

1.  Clone the repository.
2.  Install dependencies.
    ```bash
    npm install
    ```
3.  Run the development server.
    ```bash
    npm run dev
    ```
    The application will be running on `http://localhost:5173`.

---

### Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Creates a production build in the `/dist` directory.
-   `npm run test`: Runs all tests with Vitest.
-   `npm run test:coverage`: Runs tests and generates a coverage report.
-   `npm run preview`: Serves the production build locally for preview.
-   `npm run lint`: Lints the codebase with ESLint.
