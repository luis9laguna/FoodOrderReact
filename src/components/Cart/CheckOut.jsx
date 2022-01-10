import { useRef, useState } from 'react'
import styles from './CheckOut.module.css'

const isEmpty = value => value.trim() === ""
const isFiveChars = value => value.trim().length !==5


const CheckOut = ({onCancel, onConfirm}) => {

    const [ formInputsValidity, setFormInputsValidity ] = useState({
        name: true,
        street: true,
        city: true,
        postal: true 
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (e) =>{
        e.preventDefault()

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredPostalIsValid = !isFiveChars(enteredPostal)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postal: enteredPostalIsValid
        })

        const formIsValid = 
            enteredNameIsValid && 
            enteredStreetIsValid &&
            enteredCityIsValid &&
            enteredPostalIsValid

        if(!formIsValid){
            return;
        }

        onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    }  

    const nameControlStyles = `${styles.control} 
    ${formInputsValidity.name ? '' : styles.invalid}`

    const streetControlStyles = `${styles.control} 
    ${formInputsValidity.street ? '' : styles.invalid}`

    const postalControlStyles = `${styles.control} 
    ${formInputsValidity.postal ? '' : styles.invalid}`

    const cityControlStyles = `${styles.control} 
    ${formInputsValidity.name ? '' : styles.invalid}`

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={nameControlStyles}>
                <label htmlFor='name'>Your Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please entered a valid name</p>}
            </div>
            <div className={streetControlStyles}>
                <label htmlFor='street'>Street</label>
                <input type="text" id="street" ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please entered a valid street</p>}
            </div>
            <div className={postalControlStyles}>
                <label htmlFor='postal'>Postal Code</label>
                <input type="text" id="postal" ref={postalInputRef} />
                {!formInputsValidity.postal && <p>Please entered a valid postal of 5 digits</p>}
            </div>
            <div className={cityControlStyles}>
                <label htmlFor='city'>City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please entered a valid city</p>}
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default CheckOut
