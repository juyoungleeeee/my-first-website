import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';

/**
 * Header 공통 컴포넌트
 *
 * Props:
 * @param {object|null} currentUser - 현재 로그인 사용자 정보 [Optional]
 * @param {function} onLogout - 로그아웃 핸들러 [Optional]
 *
 * Example usage:
 * <Header currentUser={user} onLogout={handleLogout} />
 */
function Header({ currentUser = null, onLogout }) {
  const navigate = useNavigate();

  return (
    <AppBar position='static' sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <RestaurantIcon sx={{ mr: 1 }} />
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 700 }}
          onClick={() => navigate('/posts')}
        >
          아이 맛있다 🍽️
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          { currentUser ? (
            <>
              <Typography variant='body2' sx={{ color: 'white', mr: 1 }}>
                { currentUser.name }님
              </Typography>
              <Button
                color='inherit'
                variant='outlined'
                size='small'
                sx={{ borderColor: 'white', color: 'white' }}
                onClick={onLogout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <Button
              color='inherit'
              variant='outlined'
              size='small'
              sx={{ borderColor: 'white', color: 'white' }}
              onClick={() => navigate('/login')}
            >
              로그인
            </Button>
          ) }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
