import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Navigation from './components/common/navigation.jsx';
import HomePage from './pages/home-page.jsx';
import AboutPage from './pages/about-page.jsx';
import ProjectsPage from './pages/projects-page.jsx';

/**
 * App 컴포넌트
 * 라우팅 및 전체 레이아웃 관리
 *
 * Props: 없음
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <BrowserRouter basename="/my-first-website/lecture1/my-portfolio">
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--color-bg-primary)',
        }}
      >
        <Navigation />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

export default App;
