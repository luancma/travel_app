import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { useBottomNavigation } from '@/context/BottomNavegationProvider';
import { useBottomNavSlice } from '@/context/bottomNavSlice';

export const BottomNav = () => {
  const setSelected = useBottomNavSlice(state => state.setSelected);
  const selected = useBottomNavSlice(state => state.selected);

  return (
    <>
      <Box sx={{ pb: 7 }} />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={selected}
          onChange={(_, newValue) => {
            setSelected(newValue);
          }}
        >
          <BottomNavigationAction label="Itinerário" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Hospedagem" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  )
}