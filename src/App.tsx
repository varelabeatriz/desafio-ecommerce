
import Header from './components/Header'
import Products from './components/Products'
import ProductsProvider from './contexts/ProductsProvider'

function App() {

  return (
    <ProductsProvider>
      <Header></Header>
      <Products ></Products>
    </ProductsProvider>
    )
}

export default App
