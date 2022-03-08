import { Autocomplete, Box, TextField, ImageList, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeroDataApi from '../api/HeroDataApi';
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
            alt={option.assets.name}
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

  const handleFirstSelector = (event) => {
    setFirst(event.target.innerText);
  };

  const handleSecondSelector = (event) => {
    setSecond(event.target.innerText);
  };

  const handleThirdSelector = (event) => {
    setThird(event.target.innerText);
  };

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

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error!</div>;
  return (
    <Box>
      <Box>
        <ImageList
          sx={{ 
            width: 'auto', 
            m: 1.5,
          }}
          cols={3}
        >
          <ImageListItem >
            {(first === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={heroes[first].assets.icon} alt="icon" />
            }
          </ImageListItem>
          <ImageListItem >
          {(second === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={heroes[second].assets.icon} alt="icon" />
            }
          </ImageListItem>
          <ImageListItem >
          {(third === "")
              ? <img src={questionCircle} alt="icon" />
              : <img src={heroes[third].assets.icon} alt="icon" />
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