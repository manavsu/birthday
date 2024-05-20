import React from "react";
import styles from '../styles/Loading.module.css'
import rings from '../assets/rings.svg'

function Loading() {
   return <div className={styles.background}><img src={rings}></img></div>
}

export default Loading