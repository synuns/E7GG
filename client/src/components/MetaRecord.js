import { Box, ImageList, ImageListItem, Tooltip } from '@mui/material';
import heroesById from './HeroesById';
import PercentIcon from '@mui/icons-material/Percent';
import DefWinIcon from '../images/battle_pvp_icon_def.png';
import DefLoseIcon from '../images/battle_pvp_icon_defeat.png';
import AtkWinIcon from '../images/battle_pvp_icon_win.png'
import AtkLoseIcon from '../images/battle_pvp_icon_lose.png'
import React from 'react';

const calPercent = (win, draw, lose) => {
  const total = win + draw + lose;
  const percent = win / total * 100;
  if(percent){
    return +(Math.round(percent + "e+1")  + "e-1");
  }
  return "-";
}

const idsToNames = (records) => {
  let heroNames;
  if(records.defense){
    heroNames = records.defense.split(',').map(x => heroesById[x]);
  }else if(records[0]){
    heroNames = records[0].split(',').map(x => heroesById[x]);
  }
  return heroNames;
}

const DefRecord = ({ records }) => {
  const percent = calPercent(records.w, records.d, records.l);
  return (
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
        {percent}
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
          { records.w }
          <img src={DefWinIcon} alt="Defense" height="28"/>
        </Box>
        <Box
          display="inline-flex"
          sx={{ m:1 }}
        >
          { records.l }
          <img src={DefLoseIcon} alt="Defense" height="28"/>
        </Box>
      </Box>
    </Box>
  );
};

const AtkRecord = ({ records }) => {
  const percent = calPercent(records[1].w, records[1].d, records[1].l);
  return (
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
        {percent}
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
          { records[1].w }
          <img src={AtkWinIcon} alt="Offense" height="28"/>
        </Box>
        <Box
          display="inline-flex"
          sx={{ m:1 }}
        >
          { records[1].l }
          <img src={AtkLoseIcon} alt="Offense" height="28"/>
        </Box>
      </Box>
    </Box>
  );
};

function MetaRecord({ type, icons, records }) {
  const preventDragHandler = (event) => {
    event.preventDefault();
  }
  const heroNames = idsToNames(records);

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
          <Tooltip title={heroNames[index]}>
            <ImageListItem
              key={index}
              onDragStart={preventDragHandler}
            >
                <img src={icon} alt="icon" />
            </ImageListItem>
          </Tooltip>
        ))}
      </ImageList>
      { type === 'offense'
        ? <AtkRecord records={records} />
        : <DefRecord records={records} />
      }
    </Box>
  );
}

export default MetaRecord;