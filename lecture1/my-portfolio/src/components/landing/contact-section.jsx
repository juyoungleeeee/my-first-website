import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

/**
 * ContactSection 컴포넌트
 * Home 페이지 하단 Contact 영역
 *
 * Props: 없음
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <Box
      sx={{
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-secondary)',
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
            color: '#FFFFFF',
            mb: 3,
          }}
        >
          Contact
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
      </Container>
    </Box>
  );
}

export default ContactSection;
