import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import PostListPage from './pages/post-list-page';
import PostDetailPage from './pages/post-detail-page';
import PostWritePage from './pages/post-write-page';

function App() {
  const { currentUser, login, logout } = useAuth();

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/posts' replace />} />
        <Route path='/login' element={<LoginPage onLogin={login} />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route
          path='/posts'
          element={<PostListPage currentUser={currentUser} onLogout={logout} />}
        />
        <Route
          path='/posts/new'
          element={<PostWritePage currentUser={currentUser} onLogout={logout} />}
        />
        <Route
          path='/posts/:id'
          element={<PostDetailPage currentUser={currentUser} onLogout={logout} />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
