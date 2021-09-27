import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: ["Zurich", "Rotterdam"],
    citiesWeather: [],
  },
  mutations: {
    addNewCity(state, data) {
      state.cities.push(data);
    },
    addCityWeather(state, data) {
      state.citiesWeather.push(data);
    },
    removeCity(state, data) {
      state.cities = state.cities.filter((city) => city !== data);
    },
    removeCityWeather(state, data) {
      state.citiesWeather = state.citiesWeather.filter((city) => city.id !== data.id);
    },
  },
  actions: {
    addNewCity({ commit }, data) {
      commit("addNewCity", data);
    },
    addCityWeather({ commit }, data) {
      commit("addCityWeather", data);
    },

    removeCity({ commit }, data) {
      commit("removeCity", data.name);
    },
    removeCityWeather({ commit }, data) {
      commit("removeCityWeather", data);
    },
  },
  getters: {
    getCities: (state) => state.cities,
    getCitiesWeather: (state) => state.citiesWeather,
  },
});
