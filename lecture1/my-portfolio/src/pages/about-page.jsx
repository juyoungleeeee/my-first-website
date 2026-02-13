import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

/**
 * AboutPage 컴포넌트
 * About Me 상세 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <AboutPage />
 */
function AboutPage() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            mb: 4,
            textAlign: 'center',
          }}
        >
          About Me
        </Typography>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            backgroundColor: '#FFFFFF',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
            }}
          >
            About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈 예정입니다.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default AboutPage;
