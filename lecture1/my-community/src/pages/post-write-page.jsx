import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/header';
import StarRating from '../components/ui/star-rating';
import { supabase } from '../utils/supabase';

/**
 * PostWritePage 컴포넌트
 *
 * Props:
 * @param {object} currentUser - 현재 로그인 사용자 [Required]
 * @param {function} onLogout - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <PostWritePage currentUser={user} onLogout={handleLogout} />
 */
function PostWritePage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', rating: 3 });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const { error: dbError } = await supabase.from('posts').insert({
        title: form.title,
        content: form.content,
        rating: form.rating,
        user_id: currentUser.id,
        likes_count: 0,
      });

      if (dbError) throw dbError;
      navigate('/posts');
    } catch {
      setError('게시물 작성 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header currentUser={ currentUser } onLogout={ onLogout } />

      <Container maxWidth='md' sx={{ py: { xs: 3, md: 5 } }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h5' fontWeight={700} mb={3}>
              맛집 후기 작성 ✍️
            </Typography>

            { error && <Alert severity='error' sx={{ mb: 2 }}>{ error }</Alert> }

            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label='제목'
                name='title'
                value={ form.title }
                onChange={ handleChange }
                fullWidth
                autoFocus
                placeholder='맛집 이름이나 후기 제목을 입력하세요'
              />

              <Box>
                <Typography variant='body2' color='text.secondary' mb={1}>
                  별점
                </Typography>
                <StarRating
                  value={ form.rating }
                  onChange={(val) => setForm({ ...form, rating: val || 1 })}
                  isShowLabel
                />
              </Box>

              <TextField
                label='내용'
                name='content'
                value={ form.content }
                onChange={ handleChange }
                fullWidth
                multiline
                rows={8}
                placeholder='맛집 후기를 자세히 적어주세요'
              />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant='outlined'
                  onClick={() => navigate('/posts')}
                >
                  취소
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={ isLoading }
                >
                  { isLoading ? '저장 중...' : '작성 완료' }
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PostWritePage;
