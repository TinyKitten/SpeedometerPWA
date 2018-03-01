<template>
  <div class="gauge">
    <div :class="circleColor">
      <div class="text" v-if="speedKmh && !error">
        <span class="speed">
          {{speedKmh}}
        </span>
        <span class="unit">km/h</span>
      </div>
      <div class="text" v-else-if="!speedKmh">
        <span class="speed">
          0
        </span>
        <span class="unit">km/h</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'gauge',
  computed: {
    ...mapGetters([
      'speedKmh',
      'error',
    ]),
    circleColor() {
      if (this.speedKmh === 0) {
        return 'circle';
      } else if (this.speedKmh < 30) {
        return 'circle green';
      } else if (this.speedKmh < 60) {
        return 'circle yellow';
      }
      return 'circle red';
    },
  },
  methods: {
    ...mapActions([
      'WATCH_SPEED',
    ]),
  },
  async mounted() {
    await this.WATCH_SPEED();
  },
};
</script>

<style scoped>
  .circle {
    width: 280px;
    height: 280px;
    border: 4px solid #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 48px auto;
    animation: colorChanged 1s ease;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, .25));
  }
  .speed, .unit {
    display: block;
    text-align: center;
  }
  .speed {
    font-size: 5rem;
    line-height: 6rem;
  }
  .unit {
    font-size: 2rem;
    opacity: .75;
  }
  
  @keyframes colorChanged {
    0% {
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, .25));
    }
    50% {
      filter: drop-shadow(0 0 12px rgba(255, 255, 255, .5));
    }
    100% {
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, .25));
    }
  }
  .green {
    border: 4px solid #4CAF50;
  }
  .yellow {
    border: 4px solid #FFEB3B;
  }
  .red {
    border: 4px solid #F44336;
  }
</style>
