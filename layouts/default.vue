<template>
  <div class="container">
    <div class="leftSideSearchBar">
      <poke-search />
    </div>
    <div 
      class="pokedexRight">
      <div :class="['pokedexBackground', color, {'hide': this.$store.state.pokedexChange}]"/>
      <div class="pokedexMain">
        <nuxt/>
      </div>
      <div class="pokedexLower">
        <poke-selector />
      </div>
    </div>      
  </div>
</template>

<script>
import PokeSearch from '~/components/PokeSearch.vue'
import PokeSelector from '~/components/PokeSelector.vue'
export default {
  components: {
    PokeSearch,
    PokeSelector
  },
  data: () => {
    return {}
  },
  computed: {
    color() {
      if (this.$store.state.currentPokemon) {
        return this.$store.state.currentPokemon.types[0]
      } else {
        return 'fire'
      }
    }
  },
  created() {
    if (!this.$store.state.currentPokemon) {
      this.$store.dispatch('getPreviousPokemonData', 4)
      this.$store.dispatch('getCurrentPokemonData', 4)
      this.$store.dispatch('getNextPokemonData', 4)
    }
  }
}
</script>
