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
    <div @click="setMaxSpeed(0)" class="resetbtn">RESET</div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations([
      'setMaxSpeed',
    ]),
  },
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
    .resetbtn {
        display: table;
        margin: 0 auto;
        padding: 14px;
        text-align: center;
        background: #444;
        border-radius: 4px;
        margin-top: 24px;
        box-shadow: 0 0 8px rgba(0, 0, 0, .25);
    }
</style>
