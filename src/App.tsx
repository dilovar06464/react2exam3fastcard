import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import PageLoader from './components/PageLoader'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './components/ThemeProvider'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Login = lazy(() => import('./pages/Login'))
const Details = lazy(() => import('./pages/Details'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Products = lazy(() => import('./pages/Products'))
const Account = lazy(() => import('./pages/Account'))

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          )
        },
        {
          path: "signup",
          element: (
            <Suspense fallback={<PageLoader />}>
              <SignUp />
            </Suspense>
          )
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          )
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "about",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <About />
                </Suspense>
              )
            },
            {
              path: "contact",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Contact />
                </Suspense>
              )
            },
            {
              path: "details/:id",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Details />
                </Suspense>
              )
            },
            {
              path: "products",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Products />
                </Suspense>
              )
            },
            {
              path: "cart",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: "wishlist",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Wishlist />
                </Suspense>
              )
            },
            {
              path: "checkout",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Checkout />
                </Suspense>
              )
            },
            {
              path: "account",
              element: (
                <Suspense fallback={<PageLoader />}>
                  <Account />
                </Suspense>
              )
            }
          ]
        }
      ]
    }
  ])

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
