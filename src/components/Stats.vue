<template>
  <section class="statics">
      <div class="grid">
        <h3 class="title">
          MAX SPEED
      </h3>
      <span class="speed">
          <span class="speed">{{maxSpeedKmh}}</span>
          <span class="unit">km/h</span>
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'maxSpeedKmh',
    ]),
  },
};
</script>

<style scoped>
    .grid {
        text-align: center;
        filter: drop-shadow(0 0 8px rgba(255, 255, 255, .25));
    }
    .title {
        font-weight: bold;
        line-height: 3rem;
    }
    .speed {
        font-size: 2rem;
    }
    .unit {
        font-size: 1.25rem;
        opacity: .75;
    }
</style>
