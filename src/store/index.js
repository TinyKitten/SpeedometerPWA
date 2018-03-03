/* eslint no-param-reassign: ["error", { "props": false }] */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    speed: 0,
    maxSpeed: 0,
    error: null,
  },
  getters: {
    speed: state => state.speed,
    speedKmh: state => Math.round((state.speed * 3600) / 1000),
    maxSpeed: state => state.maxSpeed,
    maxSpeedKmh: state => Math.round((state.maxSpeed * 3600) / 1000),
    error: state => state.error,
  },
  mutations: {
    /* eslint-disable no-return-assign */
    setSpeed: (state, payload) => state.speed = payload,
    setMaxSpeed: (state, payload) => state.maxSpeed = payload,
    setError: (state, payload) => state.error = payload,
  },
  actions: {
    WATCH_SPEED({ commit, getters }) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            commit('setSpeed', position.coords.speed);
            if (getters.maxSpeed < position.coords.speed) {
              commit('setMaxSpeed', position.coords.speed);
            }
            commit('setError', null);
          },
          (error) => {
            commit('setError', error);
          },
          {
            enableHighAccuracy: false,
            timeout: 1000,
            maximumAge: 0,
          },
        );
      } else {
        commit('setError', 'GEOLOCATION_NOT_SUPPORTED');
      }
    },
  },
});
