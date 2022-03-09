import { Autocomplete, Box, TextField, ImageList, ImageListItem } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import HeroDataApi from '../api/HeroDataApi';
import heroesById from '../components/HeroesById';
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
import OffenseMetaApi from '../api/OffenseMetaApi';

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

const HeroSelector = ({ data, text, changeHandler }) => {
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
      getOptionLabel={(option) => option.name}
      onChange={changeHandler}
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

function Offense() {
  const [heroes, setHeroes] = useState([]);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metaData, setMetaData] = useState([]);
  const IdByHeroes = objectFlip(heroesById);

  const handleFirstSelector = (event) => {
    // console.log(event);
    // console.log('value : ' + event.target.value);
    // console.log('innerText : ' + event.target.innerText);
    setFirst(heroes[event.target.innerText]);
    // console.log(first);
  };

  const handleSecondSelector = (event) => {
    setSecond(heroes[event.target.innerText]);
  };

  const handleThirdSelector = (event) => {
    setThird(heroes[event.target.innerText]);
  };

  const preventDragHandler = (event) => {
    event.preventDefault();
  }

  const getOffenseMetaData = useCallback(async () => {
    if(first === "" || second === "" || third === ""){
      return
    }
    const selected = [
      IdByHeroes[first.name],
      IdByHeroes[second.name],
      IdByHeroes[third.name]
    ].sort();
    console.log(selected);
    // setLoading(true);
    await OffenseMetaApi(selected)
      .then(res => {
        setMetaData(res.data);
        console.log(res.data);
      });
      // .catch(error => {
      //   setError(error);
      //   setLoading(false);
      // });
  }, [first, second, third, IdByHeroes]);

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
    getHeroData();
  }, []);

  useEffect(() => {
    getOffenseMetaData();
  }, [getOffenseMetaData]);

  console.log(heroes);
  console.log(metaData);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error!</div>;
  return (
    <Box
      sx={{
        width: 465,
      }}
    >
      <Box>
        <ImageList
          display='fix'
          sx={{ 
            width: 'auto', 
            m: 1.5,
          }}
          cols={3}
        >
          <ImageListItem 
            onDragStart={preventDragHandler}
          >
            {(first === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={first.assets.icon} alt="icon" />
            }
          </ImageListItem>
          <ImageListItem 
            onDragStart={preventDragHandler}
          >
          {(second === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={second.assets.icon} alt="icon" />
            }
          </ImageListItem>
          <ImageListItem 
            onDragStart={preventDragHandler}
          >
          {(third === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={third.assets.icon} alt="icon" />
            }
          </ImageListItem>
        </ImageList>
      </Box>
      <Box>
        <HeroSelector 
          data={heroes}
          text="Chooste 1st hero"
          changeHandler={handleFirstSelector}
        />
        <HeroSelector 
          data={heroes}
          text="Chooste 2nd hero"
          changeHandler={handleSecondSelector}
        />
        <HeroSelector 
          data={heroes}
          text="Chooste 3rd hero"
          changeHandler={handleThirdSelector}
        />
      </Box>
      <Box>

      </Box>
    </Box>
  );
}

export default Offense;