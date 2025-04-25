import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sistema de Gestão de Produtos</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.dashboard}>
          <h2>Dashboard</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3>Total de Produtos</h3>
              <p>0</p>
            </div>
            <div className={styles.card}>
              <h3>Categorias</h3>
              <p>0</p>
            </div>
          </div>
        </section>

        <section className={styles.actions}>
          <h2>Ações Rápidas</h2>
          <div className={styles.buttons}>
            <button className={styles.primary}>Adicionar Produto</button>
            <button className={styles.secondary}>Gerenciar Categorias</button>
          </div>
        </section>
      </main>
    </div>
  );
}
