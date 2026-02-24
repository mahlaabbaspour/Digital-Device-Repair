'use client'

import { Chip, Divider, IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { BiCommentCheck, BiUserCheck } from 'react-icons/bi'

const CustomRadioIconsInstution = (props: any) => {
  // ** Props
  const { data, icon, name, selected, handleChange, color = 'primary', setSupervisorApproval } = props
  const { id } = data

  const renderComponent = () => {
    return (
      <Box
        onClick={() => handleChange(id)}
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 1,
          cursor: 'pointer',
          position: 'relative',
          border: theme => `1px solid ${theme.palette.divider}`,
          ...(selected === id
            ? { borderColor: `${color}.main` }
            : //@ts-ignore
              { '&:hover': { borderColor: theme => `rgba(${theme.palette.customColors.main}, 0.25)` } })
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            mb: 3
          }}
        >
          <Tooltip title='نظر و تایید سوپروایزر' arrow>
            <IconButton onClick={() => setSupervisorApproval(true)}>
              <BiUserCheck color={data?.supervisor_status === '1' ? '#8deb70ff' : '#ec5c5cff'} size={25} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider sx={{ mt: 3, mb: 3, color: '#554f4fff' }} />

        <Box sx={{ width: '100%', mt: 5 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 1
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: '13px' }}>{data?.date}</Typography>

            <Chip
              label={`${data?.start_time} تا ${data?.end_time}`}
              size='small'
              sx={{
                fontSize: '11px',
                height: '22px',
                bgcolor: '#E7EDFF',
                color: '#675CD8',
                borderRadius: '6px',
                fontWeight: 600
              }}
            />
          </Box>

          <Typography
            sx={{
              mt: 1,
              fontSize: '12px',
              opacity: 0.9,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {`${data?.consultationDocument?.first_name} ${data?.consultationDocument?.last_name}`}
          </Typography>
        </Box>

        {/* Radio */}
        <Radio
          name={name}
          size='small'
          color={color}
          value={id}
          onChange={handleChange}
          checked={selected === id}
          sx={{ mt: 1 }}
        />
      </Box>
    )
  }

  return data ? renderComponent() : null
}

export default CustomRadioIconsInstution
