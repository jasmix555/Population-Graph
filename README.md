# Population Graph

This project is a web application that displays population trends for various prefectures in Japan.
It allows users to select prefectures and view population data over time.
The application includes features for filtering by regions and population categories.

## Directory

```bash
src
├── App.module.css
├── App.test.tsx
├── App.tsx
├── __tests__
│   ├── PopulationChart.test.tsx
│   ├── PrefectureCheckboxes.test.tsx
│   ├── resas-api.test.ts
│   └── setup.ts
├── api
│   ├── hooks
│   │   ├── usePopulationInfo.ts
│   │   └── usePrefectures.ts
│   └── resas
│       └── resas-api.ts
├── assets
│   └── react.svg
├── components
│   ├── Checkbox
│   │   ├── Checkbox.tsx
│   │   ├── index.ts
│   │   └── style.module.css
│   ├── PopulationChart
│   │   ├── PopulationChart.tsx
│   │   ├── index.ts
│   │   └── style.module.css
│   └── PrefectureCheckbox
│       ├── PrefectureCheckboxes.tsx
│       ├── index.ts
│       └── style.module.css
├── hooks
│   ├── useCurrentPrefectures.ts
│   └── useLocalStorage.ts
├── index.css
├── main.tsx
├── mocks
│   ├── handlers.ts
│   └── server.ts
├── types
│   └── resas-api.ts
└── vite-env.d.ts

13 directories, 28 files
```

## Installation

### Clone the repository:

```bash
git clone https://github.com/jasmix555/population-graph.git
cd population-graph
```

### Install dependencies:

```bash
npm install
```

### Add Environment Variables:

Create a .env.local file in the root directory and add your RESAS API key:

RESAS API Key can be obtained from the following link:
"https://opendata.resas-portal.go.jp/form.html"

```env
VITE_RESAS_API_KEY="your_resas_api_key"
```

### Start the development server:

```bash
npm run dev
```

node version : v20.13.1 (LTS version)
npm version : 10.5.2
bun version : 1.1.13
