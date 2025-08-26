# Cosmic Horizon – Sorting Visualization App

A futuristic sorting algorithm visualizer built with React and Tailwind CSS, featuring the Cosmic Horizon Design System: stunning visuals, accessibility, and code performance using modern best practices.

---

## ✨ Features

-   **Cosmic Horizon design**: Futuristic, accessible (WCAG 2.1 AA), and highly reusable components
-   **Four animated, interactive sorting visualizations**: Bubble Sort, Insertion Sort, Merge Sort, Quick Sort
-   **Dynamic controls**: Tune array size, animation speed, and choose algorithms
-   **Manual array input** with validation
-   **Starfield animated background** (respects reduced motion preferences)
-   **Legend**, **empty state**, and **loading skeletons** with cosmic theming
-   **Fully modular codebase**: Clean separation by utility, data, and UI component

---

## 🚀 Getting Started

1.  **Install dependencies:**
    ```text
    npm install
    ```
2.  **Run the development server:**
    ```text
    npm run dev
    # or
    yarn dev
    ```
    The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

---

## 🛠️ Usage

-   **Switch algorithm**: Use selector buttons for Bubble, Insertion, Merge, or Quick Sort.
-   **Array size & speed**: Adjust with the provided sliders.
-   **Manual input**: Click "Manual Input" and enter comma/space-separated numbers (1–1000, up to 100 entries).
-   **Start/Reset**: Use action buttons to control sorting or reset the array.

---

## 🧩 Tech Stack

-   React 18+
-   Tailwind CSS 3+
-   Vite (for fast build & reload)
-   Poppins font (Google Fonts)

---

## ♿ Accessibility & Performance

-   All interactive elements have a visible focus state
-   Button, input, and card variants meet minimum AA contrast
-   Keyboard navigation and screen reader labels included
-   Animations pause when `prefers-reduced-motion` is set

---

## 📦 Building for Production

```text
npm run build
```
Static build output will appear in `dist/`. Deploy as any static site.

---

## 🖌️ Customization

-   **Theme/colors/gradients**: Edit `App.css` and `tailwind.config.js`
-   **Add algorithms**: Expand `src/utils/sortingAlgorithms.js` and `src/data/algorithmInfo.js`
-   **Design system**: Extend `components/shared/CosmicComponents.jsx` with additional atomic UI primitives

---

## 📚 Code Style

-   Modular, atomic components
-   Shared cosmic components (Button, Card, etc.) avoid repetition
-   All logic is separated: data, algorithms, pure visuals, and shared UI elements

---

## 🗂️ Project Structure

```text
sorting-visualizer/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── shared/
│   │   │   └── CosmicComponents.jsx
│   │   ├── AlgorithmInfo.jsx
│   │   ├── Bars.jsx
│   │   ├── Controls.jsx
│   │   ├── ManualArrayInput.jsx
│   │   └── SortingVisualizer.jsx
│   ├── data/
│   │   └── algorithmInfo.js
│   ├── utils/
│   │   └── sortingAlgorithms.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── ...
```

---

## 🤝 Contributing

PRs are welcome! Please keep to the Cosmic Horizon design language and maintain accessibility best practices.

