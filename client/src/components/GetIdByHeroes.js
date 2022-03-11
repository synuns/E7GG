import heroesById from './HeroesById';

const objectFlip = (obj) => {
  return Object.keys(obj).reduce((ret, key) => {
    ret[obj[key]] = key;
    return ret;
  }, {});
}

const GetIdByHeroes = () => {
  const IdByHeroes = objectFlip(heroesById);
  return IdByHeroes;
}

export default GetIdByHeroes;