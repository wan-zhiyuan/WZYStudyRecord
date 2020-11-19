import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Jspang from '../components/jspang'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Jspang>按钮</Jspang>
    </div>
  )
}
