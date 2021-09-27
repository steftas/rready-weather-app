<template>
  <div>
    <v-container v-if="loading">
      <v-row
        ><v-col cols="4">
          <v-skeleton-loader v-bind="attrs" type="article, actions" height="416"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader v-bind="attrs" type="article, actions" height="416"></v-skeleton-loader>
        </v-col>
        <v-col cols="4">
          <v-skeleton-loader v-bind="attrs" type="article, actions" height="416"></v-skeleton-loader> </v-col
      ></v-row>
    </v-container>

    <Gridstack :loading="loading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import Gridstack from "../components/Gridstack.vue";
import packResponseData from "../utility/packResponseData";
import http from "../api/axios";

export default Vue.extend({
  name: "Home",

  components: {
    Gridstack,
  },

  data: () => ({
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
    loading: true,
  }),

  computed: {
    ...mapGetters({
      cities: "getCities",
    }),
  },
  methods: {
    onGetWeather(city) {
      this.loading = true;
      http
        .get(
          `api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&units=metric&appid=f4c563633255c1fc7c79cc5f8a559729`
        )
        .then((response) => {
          this.$store.dispatch("addCityWeather", packResponseData(response.data));
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    if (this.cities) {
      this.cities.forEach((city: unknown) => {
        this.onGetWeather(city);
      });
    }
  },
});
</script>
