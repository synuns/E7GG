import { Box, ImageList, ImageListItem } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import DefIcon from '../images/battle_pvp_icon_def.png';
import DefeatIcon from '../images/battle_pvp_icon_defeat.png';
import React from 'react';

const CalPercent = (win, draw, lose) => {
  const total = win + draw + lose;
  const percent = win / total * 100;
  if(percent){
    return percent;
  }
  return 0;
}

function MetaRecord({ icons, records }) {

  const preventDragHandler = (event) => {
    event.preventDefault();
  }

  return (
    <Box
      justifyContent="space-between"
      alignContent="center"
      sx={{
        width: 'auto',
        display: 'flex',
        p: 1,
      }}
    >
      <ImageList
        sx={{ 
          width: 220, 
          height: 70,
          borderRadius: 4,
          p: 1.5,
          ':hover': {
            boxShadow: 1,
            opacity: 0.9,
          },
        }}
        cols={3}
      >
        {icons.map((icon, index) => (
          <ImageListItem
            key={index}
            onDragStart={preventDragHandler}
          >
            <img src={icon} alt="icon" />
          </ImageListItem>
        ))}
      </ImageList>
      <Box
        display="flex"
        flexDirection= "column"
        justifyContent="center"
        alignContent="center"
        sx={{
          width: 180,
          height: 70,
          py: 2.5,
          mt: 1,
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          {CalPercent(records.w + records.d + records.l)}
          <PercentIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <Box
            display="inline-flex"
            sx={{ m:1 }}
          >
            {records.w}
            <img src={DefIcon} alt="Defense" height="28"/>
          </Box>
          <Box
            display="inline-flex"
            sx={{ m:1 }}
          >
            {records.l}
            <img src={DefeatIcon} alt="Defeat" height="28"/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MetaRecord;