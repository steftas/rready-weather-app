<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-toolbar-title>Weather App</v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-autocomplete
      v-model="select"
      @change="onAddNewCity"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      class="mx-4"
      flat
      hide-no-data
      hide-selected
      hide-details
      item-text="name"
      item-value="name"
      label="Search for a new city"
    ></v-autocomplete>
  </v-app-bar>
</template>

<script lang="ts">
import PackResponseData from "@/utility/packResponseData";
import Vue from "vue";
import http from "../api/axios";

export default Vue.extend({
  name: "Header",

  data: () => ({
    loading: false,
    items: [],
    search: null,
    select: null,
  }),

  watch: {
    search(val) {
      // Items have already been requested
      if (this.loading) return;

      if (!val) return;

      this.getCitiesList(val);
    },
  },

  methods: {
    onAddNewCity() {
      this.onGetWeather(this.select);
    },
    onGetWeather(city) {
      this.loading = true;
      http
        .get(
          `api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=f4c563633255c1fc7c79cc5f8a559729`
        )
        .then((response) => {
          this.$store.dispatch("addCityWeather", PackResponseData(response.data));
          this.$store.dispatch("addNewCity", city);
          this.select = null;
          this.items = [];
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    getCitiesList(value) {
      this.items = [];
      this.loading = true;

      http
        .get(`http://autocomplete.travelpayouts.com/places2?term=${value}&locale=en&types[]=city`)
        .then((res) => {
          this.items = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
});
</script>
