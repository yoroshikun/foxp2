<template>
  <section
    v-if="this.$store.state.currentPokemon" 
    :class="['containerPokedex', { 'hide': this.$store.state.pokedexChange }]">
    <div class="leftMainPokedex">
      <poke-viewer/>
      <div class="spacer"/>
      <p class="subtitle">TYPE</p>
      <h4 
        v-for="type of this.$store.state.currentPokemon.types"
        :key="type"
        :class="['type', type]">
        {{ type }}</h4>
    </div>
    <div class="rightMainPokedex">
      <h1 class="pokemonTitle">{{ this.$store.state.currentPokemon.name }}</h1>
      <div class="greenStatsBox">
        <p class="subtitle">NO</p>
        <h4 class="info">#{{ this.$store.state.currentPokemon.id.toString().padStart(3, '0') }}</h4>
        <div class="spacer"/>
        <p class="subtitle">WEIGHT</p>
        <h4 class="info">{{ this.$store.state.currentPokemon.weight }}kg</h4>
        <div class="spacer"/>
        <p class="subtitle">HEIGHT</p>
        <h4 class="info">{{ this.$store.state.currentPokemon.height }}m</h4>
      </div>
      <div class="statsArea">
        <p class="subtitle">HP</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[0]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[0] }}</div>
        </div>
        <p class="subtitle">ATTACK</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[1]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[1] }}</div>
        </div>
        <p class="subtitle">DEFENCE</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[2]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[2] }}</div>
        </div>
        <p class="subtitle">SPECIAL-ATTACK</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[3]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[3] }}</div>
        </div>
        <p class="subtitle">SPECIAL-DEFENCE</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[4]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[4] }}</div>
        </div>
        <p class="subtitle">SPEED</p>
        <div class="statsProgressBarContainer">
          <div 
            :style="{ width: progressCalc(this.$store.state.currentPokemon.stats[5]) + '%' }"
            class="statsProgressBarProgress"/>
          <div class="statsProgressBarText">{{ this.$store.state.currentPokemon.stats[5] }}</div>
        </div>
      </div>
    </div>
  </section>
  <section 
    v-else 
    class="containerPokedex">
    <div class="loading"> Loading? </div>
  </section>
</template>

<script>
import PokeViewer from '~/components/PokeViewer.vue'

export default {
  components: {
    PokeViewer
  },
  methods: {
    progressCalc: number => {
      // Make Percentage
      return (number / 255) * 100
    }
  }
}
</script>

<style>
.containerPokedex {
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 800px;
  margin: auto;
  margin-top: 8rem;
  opacity: 1;
  transform: translate(0px, 0px);
  transition: all 0.375s cubic-bezier(0.4, 0, 0.2, 1);
}

.containerPokedex.hide {
  transform: translate(0px, 300px);
  opacity: 0;
}

.rightMainPokedex {
  flex-grow: 2;
  height: 100%;
}

.leftMainPokedex {
  flex-shrink: 1;
  height: 100%;
  flex-direction: column;
  padding: 0rem 2rem 0 2rem;
  text-align: left;
}

.pokemonTitle {
  font-size: 2rem;
  text-align: left;
  text-transform: uppercase;
  margin: 0.25rem 2rem 1.25rem 0.25rem;
  color: white;
}

.greenStatsBox {
  padding: 1.75rem;
  border-radius: 6px;
  background-color: #b1fb93;
  color: #272727;
  text-align: left;
}

.greenStatsBox .subtitle {
  margin: 0.25rem 0.25rem 0.5rem 0.25rem;
  font-size: 0.75rem;
}

.greenStatsBox .info {
  margin: 0.25rem;
  font-size: 1.15rem;
}

.greenStatsBox .spacer {
  width: 100%;
  height: 0.5rem;
}

.statsArea {
  text-align: left;
  margin-top: 2rem;
}

.statsArea .subtitle {
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.statsArea .statsProgressBarContainer {
  position: relative;
  height: 2rem;
  width: 100%;
  background: #f0fcec;
  border-radius: 3px;
  color: white;
  margin-bottom: 0.35rem;
}

.statsArea .statsProgressBarText {
  position: absolute;
  padding: 0.5rem 0 0.5rem 0.75rem;
}

.statsArea .statsProgressBarProgress {
  position: absolute;
  top: 0;
  border-radius: 3px;
  width: 20%;
  height: 100%;
  background-color: #77ccd4;
}

.type {
  font-size: 1rem;
  margin: 0.25rem 0 0.25rem 0;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0);
}

.subtitle {
  font-size: 0.75rem;
}
</style>
