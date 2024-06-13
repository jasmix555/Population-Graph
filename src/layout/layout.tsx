import style from './style.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={style.wrapper}>
      <header className={style.header}>都道府県別人口推移</header>
      <main className={style.main}>{children}</main>
    </div>
  );
};

export default Layout;
