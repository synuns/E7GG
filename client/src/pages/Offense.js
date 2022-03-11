import { Autocomplete, Box, TextField, ImageList, ImageListItem, Button, Tooltip, Modal, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import HeroDataApi from '../api/HeroDataApi';
import OffenseMetaApi from '../api/OffenseMetaApi';
import heroesById from '../components/HeroesById';
import IdToIcon from '../components/IdToIcon';
import MetaRecord from '../components/MetaRecord';
import Assassin from '../images/classassassin.png';
import Knight from '../images/classknight.png';
import Mage from '../images/classmage.png';
import Manauser from '../images/classmanauser.png';
import Ranger from '../images/classranger.png';
import Warrior from '../images/classwarrior.png';
import Dark from '../images/elementdark.png';
import Wind from '../images/elementwind.png';
import Fire from '../images/elementfire.png';
import Ice from '../images/elementice.png';
import Light from '../images/elementlight.png';
import questionCircle from "../images/question_circle.png";
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';

const attributeImgs = {
  fire: Fire,
  ice: Ice,
  wind: Wind,
  dark: Dark,
  light: Light
};

const roleImgs = {
  assassin: Assassin,
  knight: Knight,
  mage: Mage,
  manauser: Manauser,
  ranger: Ranger,
  warrior: Warrior
};

const objectFlip = (obj) => {
  return Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
}

const HeroDisplay = ({ hero }) => {
  const preventDragHandler = (event) => {
    event.preventDefault();
  }

  return (
    <Tooltip title={hero ? hero.name : "Select Hero"}>
      <ImageListItem 
        onDragStart={preventDragHandler}
      >
        {hero
          ? <img src={hero.assets.icon} alt="icon" />
          : <img src={questionCircle} alt="icon" />
        }
      </ImageListItem>
    </Tooltip>
  );
}

const HeroSelector = ({ data, loading, text, setValue, selected }) => {
  data = Object.values(data);
  return (
    <Autocomplete
      id="hero-selector"
      sx={{ 
        width: 'auto',
        mt: 2,
      }}
      options={data}
      autoHighlight
      loading={loading}
      loadingText="loading..."
      getOptionLabel={(option) => option.name}
      value={selected ? selected : null }
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      isOptionEqualToValue={(option, selected) => option.name === selected.name}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="50"
            src={option.assets.icon}
            alt={option.name}
          />
          <img
            loading="lazy"
            width="30"
            src={attributeImgs[option.attribute]}
            alt={option.attribute}
          />
          <img
            loading="lazy"
            width="28"
            src={roleImgs[option.role]}
            alt={option.role}
          />
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={text}
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
}

const CautionModal = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Select heroes again!
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Choose three different heroes each.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

function Offense() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [metaData, setMetaData] = useState([]);
  const [heroIcons, setHeroIcons] = useState([]);
  const [metaLoading, setMetaLoading] = useState(false);
  const [metaError, setMetaError] = useState(null);

  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [open, setOpen] = useState(false);

  const IdByHeroes = objectFlip(heroesById);
  const type = 'offense';
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRefresh = () => {
    setFirst(null);
    setSecond(null);
    setThird(null);
    setMetaData([]);
    setHeroIcons([]);
  };

  const handleSubmit = async () => {
    if((!first || !second || !third)||(first === second || second === third || third === first)){
      handleOpen();
      return
    }
    const selected = [
      IdByHeroes[first.name],
      IdByHeroes[second.name],
      IdByHeroes[third.name]
    ].sort();

    setMetaLoading(true);
    await OffenseMetaApi(selected)
      .then(res => {
        const offense = Object.entries(res.data).sort(function compare(a, b) {
          if (a[1].w + a[1].l + a[1].d < b[1].w + b[1].l + b[1].d)
              return 1;
          if (a[1].w + a[1].l + a[1].d > b[1].w + b[1].l + b[1].d)
              return -1;
          return 0;
        }).slice(0, 100);
        setMetaData(offense);
        console.log(metaData);
      })
      .catch(error => {
        setMetaError(error);
        setMetaLoading(false);
      });
  }

  const getHeroIcons = useCallback(async() => {
    await IdToIcon(type, metaData)
      .then(icons => {
        setHeroIcons(icons);
        setMetaLoading(false);
      })
      .catch(error => {
        setMetaError(error);
        setMetaLoading(false);
      });
  }, [metaData]);

  const getHeroData = async () => {
    setLoading(true);
    await HeroDataApi()
      .then(res => {
        setHeroes(res);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getHeroIcons();
  }, [getHeroIcons]);

  useEffect(() => {
    getHeroData();
  }, []);

  if(error) return <div>Error!</div>;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 480,
        mt: 8,
      }}
    >
      <Box>
        <ImageList
          display='fix'
          sx={{ width: 'auto', m: 1.5 }}
          cols={3}
        >
          <HeroDisplay hero={first} />
          <HeroDisplay hero={second} />
          <HeroDisplay hero={third} />
        </ImageList>
      </Box>
      <Box>
        <HeroSelector 
          data={heroes}
          loading={loading}
          text="1st hero"
          setValue={setFirst}
          selected={first}
        />
        <HeroSelector 
          data={heroes}
          loading={loading}
          text="2nd hero"
          setValue={setSecond}
          selected={second}
        />
        <HeroSelector 
          data={heroes}
          loading={loading}
          text="3rd hero"
          setValue={setThird}
          selected={third}
        />
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            mt: 2,
            width: 'auto',
          }}
        >
          <Button 
            size="large"
            variant="outlined" 
            startIcon={<RefreshIcon />}
            sx={{ mx: 2, width: '100%',  }}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
          <Button 
            size="large"
            variant="contained" 
            endIcon={<SendIcon />}
            sx={{ mx: 2, width: '100%' }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box>
        {
          heroIcons.map((heroIcon, index) => (
            <MetaRecord
              type={type}
              key={index}
              icons={heroIcon}
              records={metaData[index]}
            />
          ))
        }
      </Box>
      <CautionModal open={open} handleClose={handleClose}/>
    </Box>
  );
}

export default Offense;