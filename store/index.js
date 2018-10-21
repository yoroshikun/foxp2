import Vuex from 'vuex'

const pokedexStore = () => {
  return new Vuex.Store({
    state: () => ({
      nextPokemon: null,
      previousPokemon: null,
      currentPokemon: null,
      cachedPokemon: {},
      pokedexChange: false
    }),
    mutations: {
      setCurrentPokemonData(state, currentPokemonData) {
        state.currentPokemon = currentPokemonData
      },
      setNextPokemonData(state, nextPokemonData) {
        state.nextPokemon = nextPokemonData
      },
      setPreviousPokemonData(state, previousPokemonData) {
        state.previousPokemon = previousPokemonData
      },
      setPokemonCacheData(state, data) {
        state.cachedPokemon[data.id] = data
      },
      togglePokedexChange(state) {
        state.pokedexChange = !state.pokedexChange
        setTimeout(() => {
          state.pokedexChange = !state.pokedexChange
        }, 800)
      }
    },
    actions: {
      async getCurrentPokemonData({ commit, state }, id) {
        // Check if Pokemon is already cached
        if (state.cachedPokemon.hasOwnProperty(id)) {
          const currentPokemonData = state.cachedPokemon[id]
          commit('setCurrentPokemonData', currentPokemonData)
        } else {
          const currentPokemonData = await this.$axios.$get(
            'pokemon/' + id + '/'
          )
          const sortedPokemonData = pokeSort(currentPokemonData)
          commit('setCurrentPokemonData', sortedPokemonData)
          commit('setPokemonCacheData', sortedPokemonData)
        }
      },
      async getNextPokemonData({ commit, state }, id) {
        if (id <= 801) {
          if (state.cachedPokemon.hasOwnProperty(id + 1)) {
            const nextPokemonData = state.cachedPokemon[id + 1]
            commit('setNextPokemonData', nextPokemonData)
          } else {
            const nextPokemonData = await this.$axios.$get(
              'pokemon/' + (id + 1) + '/'
            )
            const sortedPokemonData = pokeSort(nextPokemonData)
            commit('setNextPokemonData', sortedPokemonData)
            commit('setPokemonCacheData', sortedPokemonData)
          }
        } else {
          commit('setNextPokemonData', null)
        }
      },
      async getPreviousPokemonData({ commit, state }, id) {
        if (id >= 2) {
          if (state.cachedPokemon.hasOwnProperty(id - 1)) {
            const previousPokemonData = state.cachedPokemon[id - 1]
            commit('setPreviousPokemonData', previousPokemonData)
          } else {
            const previousPokemonData = await this.$axios.$get(
              'pokemon/' + (id - 1) + '/'
            )
            const sortedPokemonData = pokeSort(previousPokemonData)
            commit('setPreviousPokemonData', sortedPokemonData)
            commit('setPokemonCacheData', sortedPokemonData)
          }
        } else {
          commit('setPreviousPokemonData', null)
        }
      }
    }
  })
}

const pokeSort = pokemonData => {
  // Make a new container Object (and we already have a variable for the data of the pokemon)
  let sortedPokemonData = {}
  // Lets Start by storing the simple stuff
  sortedPokemonData.id = pokemonData.id
  sortedPokemonData.name = pokemonData.name
  // Add the decimal
  sortedPokemonData.weight = Number(pokemonData.weight / 10).toFixed(1)
  sortedPokemonData.height = Number(pokemonData.height / 10).toFixed(1)
  // Next we want the stats, Lets make it easier for display since its reversed
  sortedPokemonData.stats = [0, 0, 0, 0, 0, 0]
  sortedPokemonData.stats[5] = pokemonData.stats[0].base_stat
  sortedPokemonData.stats[4] = pokemonData.stats[1].base_stat
  sortedPokemonData.stats[3] = pokemonData.stats[2].base_stat
  sortedPokemonData.stats[2] = pokemonData.stats[3].base_stat
  sortedPokemonData.stats[1] = pokemonData.stats[4].base_stat
  sortedPokemonData.stats[0] = pokemonData.stats[5].base_stat
  // Now for the types that are sorted by a slot not the order it comes in, We will check for this and account for it
  // Lucky there is only 2 types
  if (pokemonData.types[1]) {
    sortedPokemonData.types = [0, 0]
  } else {
    sortedPokemonData.types = [0]
  }
  for (let type of pokemonData.types) {
    if (type.slot === 1) {
      sortedPokemonData.types[0] = type.type.name
    } else {
      sortedPokemonData.types[1] = type.type.name
    }
  }
  // And finally we need sprites (Usually we would take one, but I need the other for Easter Egg)
  sortedPokemonData.sprite = pokemonData.sprites.front_default
  sortedPokemonData.sprite_shiny = pokemonData.sprites.front_shiny
  // Thats all the data we need now we return it
  return sortedPokemonData
}

export default pokedexStore
