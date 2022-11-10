import styles from './Header.module.css'

import todoLogo from '../assets/rocket.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={todoLogo} alt="Logotipo do Todo" />
      <strong>to</strong><strong>do</strong>
    </header>
  )
}