# Population Graph

This project is a web application that displays population trends for various prefectures in Japan.
It allows users to select prefectures and view population data over time.
The application includes features for filtering by regions and population categories.

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
