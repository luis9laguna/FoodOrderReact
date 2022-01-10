import { useState } from 'react';
import { useCart } from '../store/cartContext';
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartItem from './CartItem';
import CheckOut from './CheckOut';


const Cart = ({onCloseCart}) => {

    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isSubmitting, setIsSubmiting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const {items, totalAmount, addItem, removeItem, clearCart} = useCart()

    const totalAmountFixed = `$${totalAmount.toFixed(2)}`;
    const hasItems = items.length > 0;

    const cartItemRemoveHandler = id => {
        removeItem(id);
    }
    const cartItemAddHandler = item => {
        addItem(item)
    }

    const orderHandler = () =>{
        setIsCheckOut(true)
    }

    const sumbitOrderHanlder = async (userData) => {
        setIsSubmiting(true)
        await fetch('https://food-orderapp-6855b-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: items
            })
        })
        setIsSubmiting(false)
        setDidSubmit(true)
        clearCart()
    }

    const cartItems = 
    <ul className={styles['cart-items']}>
        {items.map(item =>
            <CartItem  
            key={item.id} 
            name={item.name} 
            amount={item.amount} 
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}>
            </CartItem>
        )}
    </ul>

    const modalAction = <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={onCloseCart}>Close</button>
            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div>

    const cartModalContent = 
    <>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmountFixed}</span>
        </div>
        {isCheckOut && <CheckOut onCancel={onCloseCart} onConfirm={sumbitOrderHanlder} />}
        {!isCheckOut && modalAction}
    </>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = <p>Succesfully sent the order!</p>

    return (
        <Modal onClose={onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent }
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart
