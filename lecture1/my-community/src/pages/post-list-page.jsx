import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/header';
import StarRating from '../components/ui/star-rating';
import { supabase } from '../utils/supabase';

/**
 * PostListPage 컴포넌트
 *
 * Props:
 * @param {object|null} currentUser - 현재 로그인 사용자 [Required]
 * @param {function} onLogout - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <PostListPage currentUser={user} onLogout={handleLogout} />
 */
function PostListPage({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('posts')
        .select('*, users(name, username)')
        .order('created_at', { ascending: false });

      if (dbError) throw dbError;
      setPosts(data || []);
    } catch {
      setError('게시물을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header currentUser={ currentUser } onLogout={ onLogout } />

      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant='h5' fontWeight={700}>
            맛집 후기 🗺️
          </Typography>
          { currentUser && (
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => navigate('/posts/new')}
            >
              후기 작성
            </Button>
          ) }
        </Box>

        { error && <Alert severity='error' sx={{ mb: 3 }}>{ error }</Alert> }

        { isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress color='primary' />
          </Box>
        ) : posts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant='h6' color='text.secondary'>
              아직 게시물이 없습니다.
            </Typography>
            <Typography variant='body2' color='text.secondary' mt={1}>
              첫 번째 맛집 후기를 남겨보세요!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            { posts.map((post) => (
              <Grid key={ post.id } size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate(`/posts/${ post.id }`)}
                  >
                    <CardContent>
                      <Typography
                        variant='h6'
                        fontWeight={600}
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        { post.title }
                      </Typography>

                      <StarRating value={ post.rating } isReadOnly isShowLabel />

                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          mt: 1.5,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        { post.content }
                      </Typography>

                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <PersonIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant='caption' color='text.secondary'>
                            { post.users?.name || '알 수 없음' }
                          </Typography>
                        </Box>
                        <Chip
                          icon={<FavoriteIcon sx={{ fontSize: '14px !important' }} />}
                          label={ post.likes_count }
                          size='small'
                          sx={{ bgcolor: '#FFF0F0', color: '#E53935' }}
                        />
                      </Box>

                      <Typography variant='caption' color='text.secondary' display='block' mt={1}>
                        { formatDate(post.created_at) }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )) }
          </Grid>
        ) }
      </Container>
    </Box>
  );
}

export default PostListPage;
