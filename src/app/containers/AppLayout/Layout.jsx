import { Layout as AntdLayout } from 'antd';
import Footer from './Footer';
import Header from './Header';
import './styles.scss';

export const Layout = ({ children }) => (
  <AntdLayout className="app-layout">
    <Header />
    <AntdLayout.Content className="app-content">{children}</AntdLayout.Content>
    <Footer />
  </AntdLayout>
);

export default Layout;
