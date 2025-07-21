 JSON Schema Builder

A dynamic React-based JSON Schema Builder that allows users to create, edit, and preview JSON schemas in real-time. This application supports nested fields and provides a live JSON output using React Hook Form, Tailwind CSS, and ShadCN UI.

## 🚀 Features

- Add, edit, and delete fields dynamically
- Support for three field types: `string`, `number`, and `nested`
- Recursively add nested fields for complex structures
- Live JSON preview as the user types
- Styled using ShadCN UI components and Tailwind CSS

## 🛠 Tech Stack

- ReactJS (Vite)
- React Hook Form
- Tailwind CSS
- ShadCN UI

## 📦 Setup Instructions

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/json-schema-builder.git
cd json-schema-builder

    Install Dependencies

npm install

    Start the Development Server

npm run dev

    Open in Browser

http://localhost:5173

📂 Folder Structure

src/
├── App.jsx
├── SchemaField.jsx
├── components/
│   └── ui/
│       ├── button.jsx
│       ├── input.jsx
│       └── select.jsx
├── index.css
├── main.jsx
tailwind.config.js
vite.config.js