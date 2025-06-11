import { Box, Button, Typography } from '@mui/material';

const generatePageNumbers = (page: number, count: number, limit: number): (number | string)[] => {
  const totalPages = Math.ceil(count / limit);
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (page <= 3) {
    pages.push(1, 2, 3, 4, '...', totalPages);
  } else if (page >= totalPages - 2) {
    pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
  }

  return pages;
};

const PaginationControls = ({
  count,
  page,
  limit,
  onPageChange,
}: {
  count: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = generatePageNumbers(page, count, limit);
  const totalPages = Math.ceil(count / limit);

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" px={2} py={2}>
      <Typography variant="body2" color="text.secondary">
        Показано {(page - 1) * limit + 1}-{Math.min(page * limit, count)} из {count}
      </Typography>
      <Box display="flex" gap={1} mt={{ xs: 2, sm: 0 }}>
        <Button
          variant="outlined"
          size="small"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Назад
        </Button>
        {pageNumbers.map((p, i) =>
          p === '...' ? (
            <Box key={`ellipsis-${i}`} px={1} display="flex" alignItems="center">...</Box>
          ) : (
            <Button
              key={p}
              variant={p === page ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPageChange(p as number)}
              sx={{ minWidth: 36 }}
            >
              {p}
            </Button>
          )
        )}
        <Button
          variant="outlined"
          size="small"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Вперед
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationControls;