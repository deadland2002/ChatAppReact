import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { createContext } from "react";
import { Home, SignIn, SignUp } from "../pages";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

export const UserContext = createContext();
const queryClient = new QueryClient()

const App = () => {
  const [token, setToken] = useState();

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <UserContext.Provider value={{ token, setToken }}>
          <div className="root">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </div>
        </UserContext.Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
};

export default App;
