import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/header'
import Meals from './components/Meals/Meals'
import CartProvider from './components/store/CartProvider'

function App() {

  const [showCart, setShowCart] = useState(false);

  const hideCartHandler = () =>{
    setShowCart(false);
  }

  const showCartHandler = () =>{
    setShowCart(true);
  }

  return (
    <CartProvider>
      { showCart && <Cart onCloseCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  )
}

export default App
