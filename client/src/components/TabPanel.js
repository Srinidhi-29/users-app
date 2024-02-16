import { Box, Typography } from '@mui/material';
import React from 'react'

/**
 * TabPanel component to display content for a specific tab.
 * @param {object} props - Component props.
 * @param {number} props.value - Current tab index.
 * @param {number} props.index - Index of the tab panel.
 * @param {ReactNode} props.children - Content to be displayed inside the tab panel.
 */

export default function TabPanel(props) {
    const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}
