# anhtran.sh

Personal portfolio website, built with Next.js, TypeScript and Tailwind CSS.

## Project Structure

```bash
.
├── app/
│   ├── page.tsx                # Homepage
│   ├── experience/page.tsx     # Experience
│   ├── projects/page.tsx       # Projects
│   ├── hobbies/page.tsx        # Hobbies and tournament history
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Colours and themes
├── components/                 # UI components
├── content/                    # Text, data and photos
├── lib/
│   ├── site.ts                 # Name, links and resume path
│   ├── startgg.ts              # Tournament history
│   ├── steamgriddb.ts          # Game icons
│   └── images.ts               # Image resizing
└── public/                     # Favicon, screenshots and resume
```

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) 24 or later
- [start.gg](https://start.gg) API token
- [SteamGridDB](https://www.steamgriddb.com) API key (optional)

### Installation

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/kumathy/anhtran.sh.git
   cd anhtran.sh
   npm install
   ```

2. Create a `.env.local` file:

   ```bash
   STARTGG_TOKEN=your-startgg-token
   STEAMGRIDDB_KEY=your-steamgriddb-key
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000.
