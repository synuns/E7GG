import { Box, ImageList, ImageListItem } from '@mui/material';
import PercentIcon from '@mui/icons-material/Percent';
import DefWinIcon from '../images/battle_pvp_icon_def.png';
import DefLoseIcon from '../images/battle_pvp_icon_defeat.png';
import AtkWinIcon from '../images/battle_pvp_icon_win.png'
import AtkLoseIcon from '../images/battle_pvp_icon_lose.png'
import React from 'react';

const CalPercent = (win, draw, lose) => {
  const total = win + draw + lose;
  const percent = win / total * 100;
  if(percent){
    return +(Math.round(percent + "e+1")  + "e-1");
  }
  return "-";
}

const PercentRecord = ({ type, records }) => {
  let percent = 0;
  if(type === 'defense'){
    percent = CalPercent(records.w, records.d, records.l);
  }else if(type === 'offense'){
    percent = CalPercent(records[1].w, records[1].d, records[1].l);
  }
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
    >
      {percent}
      <PercentIcon />
    </Box>
  );
}

const WinRecord = ({ type, records }) => {
  if(type === 'defense'){
    return (
      <Box
        display="inline-flex"
        sx={{ m:1 }}
      >
        { records.w }
        <img src={DefWinIcon} alt="Defense" height="28"/>
      </Box>
    );
  }else if(type === 'offense'){
    return (
      <Box
        display="inline-flex"
        sx={{ m:1 }}
      >
        { records[1].w }
        <img src={AtkWinIcon} alt="Offense" height="28"/>
      </Box>
    );
  }
}

const LoseRecord = ({ type, records }) => {
  if(type === 'defense'){
    return (
      <Box
        display="inline-flex"
        sx={{ m:1 }}
      >
        { records.l }
        <img src={DefLoseIcon} alt="Defense" height="28"/>
      </Box>
    );
  }else if(type === 'offense'){
    return (
      <Box
        display="inline-flex"
        sx={{ m:1 }}
      >
        { records[1].l }
        <img src={AtkLoseIcon} alt="Offense" height="28"/>
      </Box>
    );
  }
}


function MetaRecord({ type, icons, records }) {
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
        <PercentRecord type={type} records={records} />
        <Box
          display="flex"
          justifyContent="center"
          alignContent="center"
        >
          <WinRecord type={type} records={records} />
          <LoseRecord type={type} records={records} />
        </Box>
      </Box>
    </Box>
  );
}

export default MetaRecord;