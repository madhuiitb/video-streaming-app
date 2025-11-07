import React from "react";
import { Routes, Route } from "react-router-dom";
import UploadPage from "./pages/uploadPage";
import LibraryPage from "./pages/LibraryPage";
import DashboardPage from "./pages/DashboardPage";
import { SocketProvider } from "./context/SocketProvider";
import Navbar from "./components/Layout/Navbar";

export default function App() {
  return (
    <SocketProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </SocketProvider>
  );
}