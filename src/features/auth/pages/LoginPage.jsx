import React from "react";
import Footer from "../../../components/AppFooter.jsx";
import Header from "../../../components/AppHeader.jsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-6">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
              Página de Login
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
