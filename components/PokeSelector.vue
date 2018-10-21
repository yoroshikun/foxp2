<template>
  <div class="pokedexLowerContainer">
    <div 
      v-if="this.$store.state.previousPokemon" 
      :class="['previousPokemon', { 'hide': this.$store.state.pokedexChange }]"
      @click="previousPokemon">
      <p>&lt; {{ this.$store.state.previousPokemon.name }}  #{{ this.$store.state.previousPokemon.id.toString().padStart(3, '0') }}</p>
      <img :src="this.$store.state.previousPokemon.sprite">
    </div>
    <div 
      v-if="this.$store.state.nextPokemon" 
      :class="['nextPokemon', { 'hide': this.$store.state.pokedexChange }]"
      @click="nextPokemon">
      <img :src="this.$store.state.nextPokemon.sprite">
      <p>{{ this.$store.state.nextPokemon.name }}  #{{ this.$store.state.nextPokemon.id.toString().padStart(3, '0') }} &gt;</p>
    </div>
  </div>
</template>

<style>
.pokedexLowerContainer {
  max-width: 800px;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
}

.previousPokemon {
  display: flex;
  margin: 2rem 0 2rem 0;
  padding-left: 1rem;
  border-radius: 1rem;
  border: 1px rgba(0, 0, 0, 0) solid;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  opacity: 1;
  transition: all 0.175s ease-in;
}

.previousPokemon:hover {
  background-color: #cccccc;
  border: 1px #aaa solid;
  cursor: pointer;
}

.previousPokemon.hide {
  opacity: 0;
}

.nextPokemon {
  display: flex;
  margin: 2rem 0 2rem 0;
  padding-right: 1rem;
  border-radius: 1rem;
  border: 1px rgba(0, 0, 0, 0) solid;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  opacity: 1;
  transition: all 0.175s ease-in;
}

.nextPokemon:hover {
  background-color: #cccccc;
  border: 1px #aaa solid;
  cursor: pointer;
}

.nextPokemon.hide {
  opacity: 0;
}
</style>

<script>
export default {
  data: () => {
    return {}
  },
  methods: {
    nextPokemon() {
      // Run animation
      this.$store.commit('togglePokedexChange')
      const id = this.$store.state.currentPokemon.id + 1
      this.$store.dispatch('getPreviousPokemonData', id)
      this.$store.dispatch('getCurrentPokemonData', id)
      this.$store.dispatch('getNextPokemonData', id)
    },
    previousPokemon() {
      this.$store.commit('togglePokedexChange')
      const id = this.$store.state.currentPokemon.id - 1
      this.$store.dispatch('getPreviousPokemonData', id)
      this.$store.dispatch('getCurrentPokemonData', id)
      this.$store.dispatch('getNextPokemonData', id)
    }
  }
}
</script>
