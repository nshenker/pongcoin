"use client";
import { Box, Button, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const PoolSingle = ({row}:any) => {
  return (
    <>
            <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.createdBy}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{new Date().toDateString()}</TableCell>
            <TableCell
              sx={{
                justifyContent: "start",
                display: "flex",
              }}
            >
              <Box className="btn_wrap" component={Link} href={`/play/${row.id}`}>
                <Button>Join</Button>
              </Box>
            </TableCell>
          </TableRow>
    </>
  )
}

export default PoolSingle