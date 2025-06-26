# AnalyticaX 📊

AnalyticaX is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to upload Excel files and visualize the data in dynamic 2D and 3D charts. It bridges raw spreadsheet data with intuitive visual insights, making it perfect for analysts, educators, or anyone looking to gain a quick understanding of their datasets.

---

## 🚀 Features

- 📁 Upload `.xlsx` or `.xls` Excel files
- 📊 Generate 2D and 3D charts dynamically
- 📈 Supports bar, line, pie, and doughnut charts
- 🎛️ Select columns for X and Y axes
- 🔄 Toggle between different chart types and dimensions
- ⚡ Real-time rendering using React and Chart.js/Three.js
- 🗄️ Backend API in Node.js/Express with MongoDB for data storage

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Chart.js (for 2D visualization)
- Three.js / react-three-fiber (for 3D charts)
- TailwindCSS (or custom CSS)

**Backend**
- Node.js
- Express.js
- Multer (for file uploads)
- xlsx (for Excel parsing)
- MongoDB (Mongoose)

---

## ⚙️ Getting Started

###  Clone the repository
```bash
git clone https://github.com/sahilghanmode/AnalyticaX.git
cd AnalyticaX
cd server
npm install
# Create a .env file with your MongoDB URI and PORT
npm run dev
cd frontend
npm install
npm start

