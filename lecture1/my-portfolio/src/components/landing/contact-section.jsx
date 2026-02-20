import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import SendIcon from '@mui/icons-material/Send';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://fdtjrpjmvvgbqjrtsdcq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkdGpycGptdnZnYnFqcnRzZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjI4ODcsImV4cCI6MjA4NzA5ODg4N30.Ws8rZC8zIirSiIpk51zp3gEvhdaA3h-YKGekAQjHKGk'
);

const EMOJI_LIST = ['😊', '🔥', '👍', '💡', '🎉', '🍀', '✨', '🙌'];

const KEYWORD_LIST = ['개발자', '디자이너', '기획자', '학생', '취준생', '직장인', '프리랜서', '기타'];

/**
 * ContactSection 컴포넌트
 * Home 페이지 하단 Contact + 방명록 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    message: '',
    email: '',
    keyword: '',
    emoji: '',
    rating: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setResult({ type: 'error', msg: '이름과 메시지는 필수입니다! 😅' });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.from('guestbook').insert({
        name: form.name,
        message: form.message,
        email: form.email || null,
        keyword: form.keyword || null,
        emoji: form.emoji || null,
        rating: form.rating || null,
      });
      if (error) throw error;
      setResult({ type: 'success', msg: '방명록이 등록되었습니다! 감사합니다 🎉' });
      setForm({ name: '', message: '', email: '', keyword: '', emoji: '', rating: 0 });
    } catch {
      setResult({ type: 'error', msg: '저장 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg'>
        {/* 섹션 제목 */}
        <Typography
          variant='h3'
          sx={{
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            fontWeight: 700,
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            mb: 1,
          }}
        >
          Contact ✉️
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            mb: 6,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
          }}
        >
          언제든지 연락주세요! 방명록도 남겨주시면 너무 기쁠 것 같아요 😊
        </Typography>

        <Grid container spacing={4} alignItems='flex-start'>
          {/* 왼쪽: 연락처 카드 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant='h6'
                  sx={{ color: 'var(--color-text-secondary)', fontWeight: 700, mb: 3 }}
                >
                  연락처 정보
                </Typography>

                {/* 이메일 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <EmailIcon sx={{ color: '#fff', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant='caption' sx={{ color: 'var(--color-text-muted)', display: 'block' }}>
                      이메일
                    </Typography>
                    <Typography variant='body2' sx={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      your@email.com
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

                {/* SNS 링크 */}
                <Typography
                  variant='h6'
                  sx={{ color: 'var(--color-text-secondary)', fontWeight: 700, mb: 2 }}
                >
                  SNS
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <IconButton
                    component='a'
                    href='https://github.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      width: 52,
                      height: 52,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--color-text-secondary)',
                      '&:hover': {
                        backgroundColor: 'var(--color-secondary)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    component='a'
                    href='https://instagram.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      width: 52,
                      height: 52,
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'var(--color-text-secondary)',
                      '&:hover': {
                        backgroundColor: '#E1306C',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* 오른쪽: 방명록 폼 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography
                  variant='h6'
                  sx={{ color: 'var(--color-text-secondary)', fontWeight: 700, mb: 3 }}
                >
                  방명록 남기기 📝
                </Typography>

                { result && (
                  <Alert
                    severity={ result.type }
                    sx={{ mb: 2, borderRadius: 2 }}
                    onClose={() => setResult(null)}
                  >
                    { result.msg }
                  </Alert>
                ) }

                <Box
                  component='form'
                  onSubmit={handleSubmit}
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
                >
                  {/* 이름 */}
                  <TextField
                    label='이름 *'
                    name='name'
                    value={ form.name }
                    onChange={ handleChange }
                    fullWidth
                    size='small'
                    sx={inputStyle}
                  />

                  {/* 메시지 */}
                  <TextField
                    label='메시지 *'
                    name='message'
                    value={ form.message }
                    onChange={ handleChange }
                    fullWidth
                    multiline
                    rows={3}
                    size='small'
                    placeholder='하고 싶은 말을 자유롭게 남겨주세요!'
                    sx={inputStyle}
                  />

                  {/* 이메일 (선택) */}
                  <TextField
                    label='이메일 (선택)'
                    name='email'
                    value={ form.email }
                    onChange={ handleChange }
                    fullWidth
                    size='small'
                    placeholder='비공개로 저장됩니다'
                    sx={inputStyle}
                  />

                  {/* 한마디 키워드 */}
                  <Box>
                    <Typography variant='caption' sx={{ color: 'var(--color-text-muted)', mb: 1, display: 'block' }}>
                      나는 어떤 사람? (선택)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      { KEYWORD_LIST.map((kw) => (
                        <Chip
                          key={ kw }
                          label={ kw }
                          size='small'
                          onClick={() => setForm({ ...form, keyword: form.keyword === kw ? '' : kw })}
                          sx={{
                            cursor: 'pointer',
                            backgroundColor: form.keyword === kw ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)',
                            color: 'var(--color-text-secondary)',
                            borderColor: 'transparent',
                            '&:hover': { backgroundColor: 'rgba(91,155,213,0.4)' },
                          }}
                        />
                      )) }
                    </Box>
                  </Box>

                  {/* 이모지 선택 */}
                  <Box>
                    <Typography variant='caption' sx={{ color: 'var(--color-text-muted)', mb: 1, display: 'block' }}>
                      오늘의 기분은? (선택)
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      { EMOJI_LIST.map((em) => (
                        <Box
                          key={ em }
                          onClick={() => setForm({ ...form, emoji: form.emoji === em ? '' : em })}
                          sx={{
                            fontSize: '1.6rem',
                            cursor: 'pointer',
                            p: 0.5,
                            borderRadius: 1,
                            border: '2px solid',
                            borderColor: form.emoji === em ? 'var(--color-secondary)' : 'transparent',
                            backgroundColor: form.emoji === em ? 'rgba(91,155,213,0.2)' : 'transparent',
                            transition: 'all 0.15s',
                            '&:hover': { transform: 'scale(1.2)' },
                          }}
                        >
                          { em }
                        </Box>
                      )) }
                    </Box>
                  </Box>

                  {/* 별점 */}
                  <Box>
                    <Typography variant='caption' sx={{ color: 'var(--color-text-muted)', mb: 0.5, display: 'block' }}>
                      포트폴리오 별점 평가 (선택)
                    </Typography>
                    <Rating
                      value={ form.rating }
                      onChange={(_, val) => setForm({ ...form, rating: val || 0 })}
                      sx={{ color: '#FFD740' }}
                    />
                  </Box>

                  <Button
                    type='submit'
                    variant='contained'
                    endIcon={<SendIcon />}
                    disabled={ isLoading }
                    sx={{
                      mt: 1,
                      py: 1.2,
                      backgroundColor: 'var(--color-accent)',
                      '&:hover': { backgroundColor: '#E91E63' },
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    { isLoading ? '등록 중...' : '방명록 남기기' }
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/** 다크 배경용 TextField 스타일 */
const inputStyle = {
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-secondary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-text-muted)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-secondary)' },
};

export default ContactSection;
