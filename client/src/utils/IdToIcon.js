import HeroDataApi from "../api/HeroDataApi";
import heroesById from "./HeroesById";
import questionCircle from "../images/question_circle.png";

const IdToIcon = async (type, heroStrs) => {
  const heroNamesArr = [];
  if(type === 'defense'){
    heroStrs.forEach(heroStr => {
      const heroNames = heroStr.defense.split(',').map(x => heroesById[x]);
      heroNamesArr.push(heroNames);
    });
  }else if(type === 'offense'){
    heroStrs.forEach(heroStr => {
      const heroNames = heroStr[0].split(',').map(x => heroesById[x]);
      heroNamesArr.push(heroNames);
    });
  }
  const data = await HeroDataApi()
    .then(heroData => {
      const heroIcons = heroNamesArr.map(heroNames => {
        return heroNames.map(x => heroData[x] ? heroData[x].assets.icon : questionCircle);
      });
      return heroIcons;
    })
    .catch(error => {
      return error;
    });
  return data;
}

export default IdToIcon;