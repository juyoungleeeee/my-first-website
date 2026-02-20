import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';

/**
 * RegisterPage 컴포넌트
 *
 * Props:
 * 없음 (standalone 페이지)
 *
 * Example usage:
 * <RegisterPage />
 */
function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = () => {
    if (!form.username || !form.password || !form.name) {
      return '아이디, 비밀번호, 이름은 필수 입력 사항입니다.';
    }
    if (form.password !== form.passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
    if (form.password.length < 4) {
      return '비밀번호는 4자 이상이어야 합니다.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    try {
      const { error: dbError } = await supabase.from('users').insert({
        username: form.username,
        password: form.password,
        name: form.name,
        phone: form.phone || null,
      });

      if (dbError) {
        if (dbError.code === '23505') {
          setError('이미 사용 중인 아이디입니다.');
        } else {
          setError('회원가입 중 오류가 발생했습니다.');
        }
        return;
      }
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      navigate('/login');
    } catch {
      setError('회원가입 중 오류가 발생했습니다.');
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
        </Box>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h5' mb={3} fontWeight={600}>
              회원가입
            </Typography>

            { error && (
              <Alert severity='error' sx={{ mb: 2 }}>
                { error }
              </Alert>
            ) }

            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label='이름 *'
                name='name'
                value={ form.name }
                onChange={ handleChange }
                fullWidth
                autoFocus
              />
              <TextField
                label='아이디 *'
                name='username'
                value={ form.username }
                onChange={ handleChange }
                fullWidth
              />
              <TextField
                label='비밀번호 *'
                name='password'
                type='password'
                value={ form.password }
                onChange={ handleChange }
                fullWidth
              />
              <TextField
                label='비밀번호 확인 *'
                name='passwordConfirm'
                type='password'
                value={ form.passwordConfirm }
                onChange={ handleChange }
                fullWidth
              />
              <TextField
                label='전화번호'
                name='phone'
                value={ form.phone }
                onChange={ handleChange }
                fullWidth
                placeholder='010-0000-0000'
              />

              <Button
                type='submit'
                variant='contained'
                size='large'
                fullWidth
                disabled={ isLoading }
                sx={{ mt: 1, py: 1.5 }}
              >
                { isLoading ? '가입 중...' : '회원가입' }
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant='body2' color='text.secondary' display='inline'>
                이미 계정이 있으신가요?{'  '}
              </Typography>
              <Button
                variant='text'
                color='primary'
                onClick={() => navigate('/login')}
                sx={{ p: 0, minWidth: 'auto', fontWeight: 600 }}
              >
                로그인
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default RegisterPage;
