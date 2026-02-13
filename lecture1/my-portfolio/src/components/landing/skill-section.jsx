import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

/**
 * SkillSection 컴포넌트
 * Home 페이지 Skill Tree 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <SkillSection />
 */
function SkillSection() {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
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
          Skill Tree
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default SkillSection;
