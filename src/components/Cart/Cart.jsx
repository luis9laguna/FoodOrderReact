import { useCart } from '../store/cartContext';
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartItem from './CartItem';
const Cart = ({onCloseCart}) => {

    const {items, totalAmount, addItem, removeItem} = useCart()

    const totalAmountFixed = `$${totalAmount.toFixed(2)}`;
    const hasItems = items.length > 0;

    const cartItemRemoveHandler = id => {
        removeItem(id);
    }
    const cartItemAddHandler = item => {
        addItem(item)
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

    return (
        <Modal onClose={onCloseCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmountFixed}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={onCloseCart}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
