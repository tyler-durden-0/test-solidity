import styles from './styles.module.css';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className={styles.main}>{children}</div>
  )
}
