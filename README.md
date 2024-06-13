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

## What i worked on

Coding experience:
- i have rarely ever used an api to get information or use something of the sort which was challenging at first.
- i also had to use axios, swr which is mainly related to api linking and securing which was very tough
- it was my first time writing a test code which i couldnt get the hang of it and had to read a lot of documents and help from AI
- first time writing a mock server using msw to imitate the functions of the real website and use it on the test codes
- first time dealing with cache of the sort when using swr
- first time using a graph library and had to study its options and series of functions
