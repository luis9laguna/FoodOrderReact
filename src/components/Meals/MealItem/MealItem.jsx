import { useCart } from "../../store/cartContext"
import styles from "./MealItem.module.css"
import MealItemForm from "./MealItemForm"

const MealItem = ({name, description, price, id}) => {

    const { addItem } = useCart()

    const priceFixed = `$${price.toFixed(2)}`

    const addToCartHandler = amount => {

        addItem({
            id,
            name,
            amount,
            price
        })
    };

    return (
        <li className={styles.meal}>
            <div>
            <div><h3>{name}</h3></div>   
            <div className={styles.description}>{description}</div>
            <div className={styles.price}>{priceFixed}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={addToCartHandler}/>
            </div>
        </li>
    )
}

export default MealItem
