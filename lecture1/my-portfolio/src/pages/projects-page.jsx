import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

/**
 * ProjectsPage 컴포넌트
 * Projects 상세 페이지
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
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
          Projects
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
            Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
