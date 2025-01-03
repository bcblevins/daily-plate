import { useNavigate } from "react-router";
import styles from "../../assets/scss/modules/NavBar.module.scss"

function NavBar() {
    const navigate = useNavigate();
    return ( 
        <nav className={styles.navBar}>
            <div className={styles.summary} onClick={() => navigate("/summary")}>Summary</div>
            <div className={styles.search} onClick={() => navigate("/search")}> <span>+</span> </div>
            <div className={styles.foods} >Foods</div>
        </nav>
    );
}

export default NavBar;