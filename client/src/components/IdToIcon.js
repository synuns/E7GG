import HeroDataApi from "../api/HeroDataApi";
import heroesById from "./HeroesById";
import questionCircle from "../images/question_circle.png";

const IdToIcon = async (heroStrs) => {
  const heroNamesArr = [];
  heroStrs.forEach(heroStr => {
    const heroNames = heroStr.defense.split(',').map(x => heroesById[x]);
    heroNamesArr.push(heroNames);
  });
  const heroIcons = await HeroDataApi()
    .then(heroData => {
      const heroIcons = heroNamesArr.map(heroNames => {
        return heroNames.map(x => heroData[x] ? heroData[x].assets.icon : questionCircle);
      });
      return heroIcons;
    })
    .catch(error => {
      return error;
    });
  return heroIcons;
}

export default IdToIcon;