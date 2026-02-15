# Doozie E-Commerce

A modern, responsive e-commerce web application built with React. Doozie provides a seamless shopping experience with a clean and intuitive user interface.

## 🌐 Live Demo

Visit the live application: [ecommerce-doozie.vercel.app](https://ecommerce-doozie.vercel.app)

## ✨ Features

- **Product Catalog**: Browse through a wide range of products with detailed information
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Responsive Design**: Fully responsive interface that works on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean and intuitive user interface for enhanced shopping experience
- **Fast Performance**: Optimized React application for quick page loads

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **Styling**: CSS3
- **Deployment**: Vercel
- **Containerization**: Docker

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Getting Started

### Option 1: Run with Docker (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/tasnimjubaier/ecommerce-doozie.git
cd ecommerce-doozie
```

2. Build and run the Docker container:
```bash
docker-compose up --build
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

### Option 2: Run in Development Mode

1. Clone the repository:
```bash
git clone https://github.com/tasnimjubaier/ecommerce-doozie.git
cd ecommerce-doozie
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The page will automatically reload when you make changes to the code.

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## 🐳 Docker Deployment

The project includes Docker configuration for easy containerized deployment:

### Using Docker Compose
```bash
docker-compose up --build
```

### Using Docker directly
```bash
# Build the image
docker build -t ecommerce-doozie .

# Run the container
docker run -p 3000:3000 ecommerce-doozie
```

## 📁 Project Structure

```
ecommerce-doozie/
├── .github/
│   └── workflows/          # GitHub Actions CI/CD workflows
├── public/                 # Static files
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── styles/            # CSS stylesheets
│   └── App.js             # Main App component
├── .dockerignore          # Docker ignore file
├── .gitignore             # Git ignore file
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Vercel for hosting and deployment platform
- All contributors who have helped improve this project

## 📧 Contact

For any questions or suggestions, please open an issue on the [GitHub repository](https://github.com/tasnimjubaier/ecommerce-doozie/issues).

---
