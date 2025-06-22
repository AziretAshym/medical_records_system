import { Outlet, useLocation } from 'react-router-dom';
import Toolbar from '@/components/Toolbar/Toolbar.tsx';
import { Container } from '@mui/material';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = ['/login'].includes(location.pathname);

  return (
    <>
      {!isLoginPage && (
        <header className="fixed top-0 left-0 right-0 z-50 mb-6">
          <Toolbar/>
        </header>
      )}
      <main style={{ marginTop: isLoginPage ? 0 : 84, paddingBottom: 29 }}>
        {isLoginPage ? (
          <Container>
            <Outlet/>
          </Container>
        ) : (
          <Container>
            <Outlet/>
          </Container>
        )}
      </main>
    </>
  );
};

export default Layout;
