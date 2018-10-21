<template>
  <div class="pokeViewerContainer">
    <div class="pokeViewerScreen">
      <img
        v-if="!shiny"
        :src="this.$store.state.currentPokemon.sprite"
        class="pokeViewerSprite">
      <img
        v-else
        :src="this.$store.state.currentPokemon.sprite_shiny"
        class="pokeViewerSprite" >
    </div>
    <div class="pokeViewerButtonContainer">
      <div 
        class="pokeViewerButton1"
        @click="shiny = !shiny">
        <svg 
          height="25"
          width="25">
          <circle 
            cx="12"
            cy="12"
            r="12"
            fill="#f4504f"/>
        </svg>
      </div>
      <div class="pokeViewerButton2">
        <svg
          height="25"
          width="30">
          <line 
            x1="2"
            y1="3"
            x2="28"
            y2="3"
            stroke-width="3px"
            stroke="black"
            stroke-linecap="round"/>
          <line 
            x1="2"
            y1="9"
            x2="28"
            y2="9"
            stroke-width="3px"
            stroke="black"
            stroke-linecap="round"/>
          <line 
            x1="2"
            y1="15"
            x2="28"
            y2="15"
            stroke-width="3px"
            stroke="black"
            stroke-linecap="round"/>
          <line 
            x1="2"
            y1="21"
            x2="28"
            y2="21"
            stroke-width="3px"
            stroke="black"
            stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style>
.pokeViewerContainer {
  background-color: #f0fcec;
  min-width: 250px;
  border-radius: 3px;
  padding: 1.25rem 1.25rem 0 1.25rem;
}

.pokeViewerScreen {
  background-color: #77ccd4;
  padding: 1.5rem;
}

.pokeViewerSprite {
  height: 12rem;
  width: 12rem;
}

.pokeViewerButtonContainer {
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  display: flex;
  justify-content: space-between;
}

.pokeViewerButton1 {
  cursor: pointer;
}
</style>

<script>
export default {
  data() {
    return {
      shiny: false
    }
  }
}
</script>
