import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

/**
 * LoginPage 컴포넌트
 *
 * Props:
 * @param {function} onLogin - 로그인 성공 시 호출할 함수 [Required]
 *
 * Example usage:
 * <LoginPage onLogin={handleLogin} />
 */
function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('username', form.username)
        .eq('password', form.password)
        .single();

      if (dbError || !data) {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
        return;
      }
      onLogin(data);
      navigate('/posts');
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bgcolor: 'background.default',
      py: { xs: 2, md: 4 },
    }}>
      <Container maxWidth='sm'>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <RestaurantIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant='h4' color='primary' fontWeight={700}>
            아이 맛있다 🍽️
          </Typography>
          <Typography variant='body1' color='text.secondary' mt={1}>
            맛집 이야기를 나눠요!
          </Typography>
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h5' mb={3} fontWeight={600}>
              로그인
            </Typography>

            { error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                { error }
              </Alert>
            ) }

            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label='아이디'
                name='username'
                value={ form.username }
                onChange={ handleChange }
                fullWidth
                autoFocus
              />
              <TextField
                label='비밀번호'
                name='password'
                type='password'
                value={ form.password }
                onChange={ handleChange }
                fullWidth
              />
              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={ isLoading }
                sx={{ mt: 1, py: 1.5 }}
              >
                { isLoading ? '로그인 중...' : '로그인' }
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='body2' color='text.secondary' display='inline'>
                계정이 없으신가요?{'  '}
              </Typography>
              <Button
                variant='text'
                color='primary'
                onClick={() => navigate('/register')}
                sx={{ p: 0, minWidth: 'auto', fontWeight: 600 }}
              >
                회원가입
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LoginPage;
