import { Box, Container, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
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
  }else if(percent === 0){
    return 0;
  }else{
    return "-";
  }
}

const idsToNames = (records) => {
  let heroNames;
  if(!records.defense){
    heroNames = records[0].split(',').map(x => heroesById[x]);
  }else if(!records[0]){
    heroNames = records.defense.split(',').map(x => heroesById[x]);
  }
  return heroNames;
}

const preventDragHandler = (event) => {
  event.preventDefault();
}

const DefRecord = ({ icons, records }) => {
  const heroNames = idsToNames(records);
  const percent = calPercent(records.w, records.d, records.l);
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/offense", { state : heroNames });
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
        onClick={handleClick}
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
          <Tooltip key={index} title={heroNames[index]} arrow >
            <ImageListItem
              onDragStart={preventDragHandler}
            >
                <img src={icon} alt="icon" loading="lazy" />
            </ImageListItem>
          </Tooltip>
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
    </Box>
  );
};

const AtkRecord = ({ icons, records }) => {
  const heroNames = idsToNames(records);
  const percent = calPercent(records[1].w, records[1].d, records[1].l);

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
          <Tooltip key={index} title={heroNames[index]}>
            <ImageListItem
              onDragStart={preventDragHandler}
            >
                <img src={icon} alt="icon" loading="lazy" />
            </ImageListItem>
          </Tooltip>
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
    </Box>
  );
};

function MetaRecord({ type, icons, records }) {
  return (
    <Container>
      { (type === 'offense')
        ? <AtkRecord icons={icons} records={records} />
        : <DefRecord icons={icons} records={records} />
      }
    </Container>
  );
}

export default MetaRecord;