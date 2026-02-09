import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material'

type ErrorItem = {
  row: number
  message: string
}

export default function ExcelErrorsTable({ errors }: { errors: ErrorItem[] }) {
  if (!errors || errors.length === 0) return null

  return (
    <Box mt={4}>
      <TableContainer
        component={Paper}
        sx={{
          //   borderRadius: 3,
          boxShadow: 'none',
          border: '1px solid #e0e0e0'
        }}
      >
        <Table size='small'>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f7f7fb' }}>
              <TableCell sx={{ fontWeight: 700 }}>شماره ردیف</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>پیام خطا</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {errors.map((err, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(even)': { backgroundColor: '#fafafa' }
                }}
              >
                <TableCell>{err.row}</TableCell>
                <TableCell sx={{ color: '#d32f2f' }}>{err.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
