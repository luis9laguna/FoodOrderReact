import { useState, useEffect } from "react"
import CartIcon from "../Cart/CartIcon"
import styles from "./HeaderCartButton.module.css"
import { useCart } from "../store/cartContext"

const HeaderCartButton = ({onClick}) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const { items } = useCart()

    const numberOfCartItems = items.reduce((c, item) => {
        return c + item.amount
    }, 0)

    const btnStyles = `${styles.button} ${btnHighlighted ? styles.bump : ""}`

    useEffect(() => {
        if(items.length === 0){
            return
        }
        setBtnHighlighted(true)
        const timer = setTimeout(() => {
            setBtnHighlighted(false) 
        }, 300)
        return () =>{
        clearTimeout(timer)
    }
    }, [items]);

    return (
        <button className={btnStyles} onClick={onClick}>
            <span className={styles.icon}>
                <CartIcon/>
            </span>
            <span> Your Cart</span>
            <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton
