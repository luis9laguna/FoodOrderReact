import styles from './Header.module.css'
import Meal from "../assets/meals.jpg"
import HeaderCartButton from './HeaderCartButton'

export default function Header({onShowCart}) {

    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={Meal} alt='meals'/>
            </div>
        </>
    )
}
