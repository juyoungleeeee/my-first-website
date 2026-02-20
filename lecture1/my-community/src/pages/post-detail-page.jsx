import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/header';
import StarRating from '../components/ui/star-rating';
import { supabase } from '../utils/supabase';

/**
 * PostDetailPage 컴포넌트
 *
 * Props:
 * @param {object|null} currentUser - 현재 로그인 사용자 [Required]
 * @param {function} onLogout - 로그아웃 핸들러 [Required]
 *
 * Example usage:
 * <PostDetailPage currentUser={user} onLogout={handleLogout} />
 */
function PostDetailPage({ currentUser, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
    if (currentUser) {
      fetchLikeStatus();
    }
  }, [id, currentUser]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('posts')
        .select('*, users(name, username)')
        .eq('id', id)
        .single();

      if (dbError) throw dbError;
      setPost(data);
    } catch {
      setError('게시물을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error: dbError } = await supabase
        .from('comments')
        .select('*, users(name)')
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (dbError) throw dbError;
      setComments(data || []);
    } catch {
      /* ignore */
    }
  };

  const fetchLikeStatus = async () => {
    if (!currentUser) return;
    const { data } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', currentUser.id)
      .eq('post_id', id)
      .single();
    setIsLiked(!!data);
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    try {
      if (isLiked) {
        await supabase.from('likes').delete()
          .eq('user_id', currentUser.id)
          .eq('post_id', id);
        await supabase.from('posts').update({ likes_count: post.likes_count - 1 }).eq('id', id);
        setPost({ ...post, likes_count: post.likes_count - 1 });
      } else {
        await supabase.from('likes').insert({ user_id: currentUser.id, post_id: id });
        await supabase.from('posts').update({ likes_count: post.likes_count + 1 }).eq('id', id);
        setPost({ ...post, likes_count: post.likes_count + 1 });
      }
      setIsLiked(!isLiked);
    } catch {
      /* ignore */
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    if (!commentText.trim()) return;

    setIsCommentLoading(true);
    try {
      const { error: dbError } = await supabase.from('comments').insert({
        content: commentText,
        user_id: currentUser.id,
        post_id: parseInt(id),
      });

      if (dbError) throw dbError;
      setCommentText('');
      fetchComments();
    } catch {
      alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsCommentLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header currentUser={ currentUser } onLogout={ onLogout } />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color='primary' />
        </Box>
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header currentUser={ currentUser } onLogout={ onLogout } />
        <Container maxWidth='md' sx={{ py: 4 }}>
          <Alert severity='error'>{ error || '게시물을 찾을 수 없습니다.' }</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header currentUser={ currentUser } onLogout={ onLogout } />

      <Container maxWidth='md' sx={{ py: { xs: 3, md: 5 } }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ mb: 2 }}
          color='inherit'
        >
          목록으로
        </Button>

        {/* 게시물 카드 */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h5' fontWeight={700} mb={2}>
              { post.title }
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                <Typography variant='body2' color='text.secondary'>
                  { post.users?.name || '알 수 없음' }
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  · { formatDate(post.created_at) }
                </Typography>
              </Box>
              <StarRating value={ post.rating } isReadOnly isShowLabel />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant='body1' sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap', mb: 3 }}>
              { post.content }
            </Typography>

            {/* 좋아요 버튼 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', py: 2 }}>
              <IconButton onClick={ handleLike } sx={{ color: isLiked ? 'error.main' : 'text.secondary' }}>
                { isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
              </IconButton>
              <Typography variant='body1' fontWeight={600} color={ isLiked ? 'error.main' : 'text.secondary' }>
                { post.likes_count }
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant='h6' fontWeight={600} mb={3}>
              댓글 { comments.length }개
            </Typography>

            {/* 댓글 작성 */}
            <Box component='form' onSubmit={handleCommentSubmit} sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                value={ commentText }
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={ currentUser ? '댓글을 입력하세요' : '로그인 후 댓글을 작성할 수 있습니다' }
                fullWidth
                multiline
                rows={2}
                disabled={ !currentUser }
              />
              <Button
                type='submit'
                variant='contained'
                disabled={ !currentUser || isCommentLoading || !commentText.trim() }
                sx={{ mt: 0.5, whiteSpace: 'nowrap' }}
              >
                등록
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* 댓글 목록 */}
            { comments.length === 0 ? (
              <Typography variant='body2' color='text.secondary' textAlign='center' py={2}>
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
              </Typography>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                { comments.map((comment) => (
                  <Box key={ comment.id }>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                        <Typography variant='body2' fontWeight={600}>
                          { comment.users?.name || '알 수 없음' }
                        </Typography>
                      </Box>
                      <Typography variant='caption' color='text.secondary'>
                        { formatDate(comment.created_at) }
                      </Typography>
                    </Box>
                    <Typography variant='body2' sx={{ pl: 2.5, color: 'text.primary' }}>
                      { comment.content }
                    </Typography>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                )) }
              </Box>
            ) }
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
