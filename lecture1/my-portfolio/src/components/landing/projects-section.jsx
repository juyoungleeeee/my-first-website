import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

/**
 * ProjectsSection 컴포넌트
 * Home 페이지 Projects 미리보기 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
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
            mb: 4,
          }}
        >
          Projects
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3].map((item) => (
            <Grid key={item} size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 2,
                  minHeight: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: 'var(--color-text-muted)' }}
                >
                  프로젝트 {item} 썸네일
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'var(--color-text-muted)',
            mb: 4,
            lineHeight: 1.6,
          }}
        >
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
        </Typography>
        <Button
          component={Link}
          to="/projects"
          variant="contained"
          sx={{
            backgroundColor: 'var(--color-accent)',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#E91E63',
            },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

export default ProjectsSection;
