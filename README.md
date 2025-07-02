# React Spreadsheet Application

A modern, interactive spreadsheet application built with React, TypeScript, and Tailwind CSS that replicates the look and feel of Google Sheets/Excel.

## 🚀 Features

- **Pixel-perfect design** matching Figma specifications
- **Keyboard navigation** with arrow keys, Tab, Enter, and shortcuts
- **Column resizing** with drag-and-drop functionality
- **Interactive cell selection** with visual feedback
- **Status badges** with color-coded priorities
- **Responsive design** with proper hover states
- **Console logging** for all user interactions

## 🛠️ Tech Stack

- **React 18** with TypeScript (strict mode)
- **Tailwind CSS** for utility-first styling
- **Lucide React** for icons
- **Vite** for fast development and building

## 📦 Installation

1. **Create a new Vite project:**
```bash
npm create vite@latest my-spreadsheet-app -- --template react-ts
cd my-spreadsheet-app
```

2. **Install dependencies:**
```bash
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react
```

3. **Initialize Tailwind CSS:**
```bash
npx tailwindcss init -p
```

4. **Configure Tailwind CSS:**

Update `tailwind.config.js`:
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

5. **Update CSS file:**

Replace content in `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. **Add the component:**

Replace `src/App.tsx` with:
```tsx
import SpreadsheetApp from './components/SpreadsheetApp'
import './index.css'

function App() {
  return <SpreadsheetApp />
}

export default App
```

7. **Create the component:**

Create `src/components/SpreadsheetApp.tsx` and paste the spreadsheet component code.

## 🎮 Usage

### Keyboard Navigation
- **Arrow Keys**: Navigate between cells
- **Tab**: Move to next cell (Shift+Tab for previous)
- **Enter**: Move down one row
- **Home**: Jump to first column (Ctrl+Home for top-left)
- **End**: Jump to last column (Ctrl+End for bottom-right)

### Mouse Interactions
- **Click any cell** to select it
- **Hover over column borders** to resize columns
- **Drag column borders** to adjust width
- **Click buttons/tabs** to trigger actions (logged to console)

### Features Demo
- All buttons and tabs log actions to the browser console
- Cell selection is visually highlighted with blue border
- Column resizing has minimum width of 50px
- Status badges show different colors for each status type
- Priority column uses color coding (Red=High, Yellow=Medium, Blue=Low)

## 🔧 Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📊 Data Structure

The spreadsheet displays job request data with the following columns:
- **#**: Row number
- **Job Request**: Task description
- **Submitted**: Submission date
- **Status**: Current status (In-process, Need to start, Complete, Blocked)
- **Submitter**: Person who submitted the request
- **URL**: Related link
- **Assigned**: Person assigned to the task
- **Priority**: Task priority (High, Medium, Low)
- **Due Date**: Deadline
- **Est. Value**: Estimated value in rupees

## 🎨 Design Features

- **Modern UI** with clean borders and hover effects
- **Color-coded status badges** for easy status recognition
- **Interactive elements** with proper cursor states
- **Responsive layout** that adapts to content
- **Professional typography** and spacing
- **Accessible color contrast** and semantic markup

## 🐛 Console Logging

All interactions are logged to the browser console for debugging:
- Cell clicks: `Cell clicked: Row X, Column Y`
- Keyboard navigation: `Navigated to: Row X, Column Y`
- Button clicks: `Button clicked: [Action Name]`
- Tab changes: `Tab clicked: [Tab Name]`
- Column resizing: `Column [name] resized to [width]px`

## 📝 Assignment Requirements

This project fulfills all the specified requirements:
- ✅ Pixel-perfect match to Figma design
- ✅ Google Sheet/Excel-like experience
- ✅ All buttons/tabs functional with console logging
- ✅ Clean code that passes linting and type checking
- ✅ Keyboard navigation within the grid
- ✅ Column resize functionality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**