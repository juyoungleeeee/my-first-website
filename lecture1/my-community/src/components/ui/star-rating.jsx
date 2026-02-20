import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * StarRating 컴포넌트
 *
 * Props:
 * @param {number} value - 별점 값 (1~5) [Required]
 * @param {boolean} isReadOnly - 읽기 전용 여부 [Optional, 기본값: false]
 * @param {function} onChange - 별점 변경 핸들러 [Optional]
 * @param {boolean} isShowLabel - 라벨 표시 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <StarRating value={4} isReadOnly={true} />
 */
function StarRating({ value, isReadOnly = false, onChange, isShowLabel = false }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        value={ value }
        readOnly={ isReadOnly }
        onChange={ (_, newValue) => onChange && onChange(newValue) }
        precision={1}
        sx={{ color: 'secondary.main' }}
      />
      { isShowLabel && (
        <Typography variant='body2' color='text.secondary'>
          ({ value }점)
        </Typography>
      ) }
    </Box>
  );
}

export default StarRating;
