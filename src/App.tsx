import { Header } from './components/Header'
import { InputTask } from './components/InputTask'

import styles from './App.module.css'

import './global.css'

export function App() {
  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <InputTask />
      </div>
    </>
  );
}
