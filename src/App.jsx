import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { Suspense, lazy } from "react";

function App() {
  const LazyDashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
  const LazyOrders = lazy(() => import("./pages/Orders/Orders"));
  const LazyOrderDetails = lazy(() =>
    import("./pages/Orders/OrderDetails/OrderDetails")
  );
  const LazyProducts = lazy(() => import("./pages/Products/Products"));
  const LazyUsers = lazy(() => import("./pages/Users/Users"));
  const LazyLogin = lazy(() => import("./pages/Login/Login"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense>
                <LazyLogin />
              </Suspense>
            }
          />
          <Route element={<Layout />}>
            <Route
              exact
              path="/"
              element={
                <Suspense>
                  <LazyDashboard />
                </Suspense>
              }
            />
            <Route
              exact
              path="/orders"
              element={
                <Suspense>
                  <LazyOrders />
                </Suspense>
              }
            />
            <Route
              exact
              path="/order_detail/:id"
              element={
                <Suspense>
                  <LazyOrderDetails />
                </Suspense>
              }
            />
            <Route
              exact
              path="/products"
              element={
                <Suspense>
                  <LazyProducts />
                </Suspense>
              }
            />
            <Route
              exact
              path="/users"
              element={
                <Suspense>
                  <LazyUsers />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
