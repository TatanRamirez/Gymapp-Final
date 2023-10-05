import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const gymppService = {
  getPokemon: async (pokemonName) => {
    const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`);
    return response.data;
  },
};

export default gymppService;
