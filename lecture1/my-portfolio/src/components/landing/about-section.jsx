import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

/**
 * AboutSection 컴포넌트
 * Home 페이지 About Me 미리보기 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutSection />
 */
function AboutSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-primary)',
        py: { xs: 6, md: 10 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 600,
            mb: 3,
          }}
        >
          About Me
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'var(--color-text-muted)',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          component={Link}
          to="/about"
          variant="contained"
          sx={{
            backgroundColor: 'var(--color-button-primary)',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: 'var(--color-button-hover)',
            },
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

export default AboutSection;
