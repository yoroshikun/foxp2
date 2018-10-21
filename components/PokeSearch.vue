<template>
  <div>
    <p class="IDTitle">Go To ID</p>
    <input 
      v-model="pokemonID"
      type="number"
      placeholder="#"
      class="IDInput"
      @input="errorText = ''"
    >
    <p
      v-if="errorText"
      class="errorText">
      {{ errorText }}
    </p>
    <div 
      class="btn search" 
      @click="goToID">
      Search
    </div>
  </div>
</template>

<style>
.IDTitle {
  color: white;
  text-align: left;
  margin: 3rem 6px 6px 6px;
}

.IDInput {
  padding: 0.75rem;
  width: calc(100% - 0.75rem);
  margin: 6px;
  border-radius: 3px;
  border: 1px;
  font-family: 'Press Start 2P', cursive;
  box-sizing: border-box;
  transition: all ease-in 0.175s;
}

.IDInput:focus {
  outline: none;
  border-bottom: 2px #77ccd4 solid;
}

.errorText {
  color: #ff7057;
  box-sizing: border-box;
  font-size: 0.75rem;
  margin: 0 0 0 6px;
}

.btn.search {
  background-color: #77ccd4;
  color: #ffffff;
  text-align: center;
  border-radius: 3px;
  padding: 0.5rem 0 0.5rem 0;
  margin: 6px;
  font-size: 14px;
  transition: all ease-in 0.175s;
  text-transform: uppercase;
}

.btn.search:hover {
  background-color: #3ebfca;
}

.btn.search:active {
  background-color: #21b0bd;
}
</style>

<script>
export default {
  data: () => {
    return {
      pokemonID: null,
      errorText: ''
    }
  },
  methods: {
    goToID() {
      const id = parseInt(this.pokemonID)
      // Verify the ID
      if (id >= 803) {
        this.errorText = 'ID must be 802 or less'
      } else if (id <= 0) {
        this.errorText = 'ID must be 1 or greater'
      } else {
        this.$store.commit('togglePokedexChange')
        this.$store.dispatch('getPreviousPokemonData', id)
        this.$store.dispatch('getCurrentPokemonData', id)
        this.$store.dispatch('getNextPokemonData', id)
      }
    }
  }
}
</script>
