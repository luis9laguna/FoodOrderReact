import ReactDom from 'react-dom'
import styles from './Modal.module.css'


const Backdrop = ({onClose}) => {
    return <div className={styles.backdrop} onClick={onClose}/> 
}

const ModalOverlay = ({children}) =>{
    return <div className={styles.modal}> 
        <div className={styles.content}>{children}</div>    
    </div>

}

const portalElement = document.getElementById('overlays');

const Modal = ({children, onClose}) => {
    return (
        <>
            {ReactDom.createPortal(<Backdrop onClose={onClose}/>, portalElement)}
            {ReactDom.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal
