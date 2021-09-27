<template>
  <v-card class="mx-auto height-100">
    <v-app-bar flat color="rgba(0, 0, 0, 0)">
      <v-toolbar-title class="text-h4 pl-0 city_name">
        {{ cityData.name }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu :close-on-content-click="false" left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-filter-variant</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Select field to display</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="cityData.displayField.min_max"
              label="Min/Max Temperature"
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="cityData.displayField.rise_set"
              label="Sunrise/Sunset Time"
            ></v-checkbox>
          </v-list-item>
          <v-list-item>
            <v-checkbox
              v-model="cityData.displayField.wind"
              label="Wind"
            ></v-checkbox>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-card-text class="card-content">
      <v-row>
        <v-col cols="12">
          <div class="degree_div">
            <h2 class="text-h2 degree">
              {{ cityData.main.temp.toFixed(0) }}&deg;C
            </h2>
          </div>
        </v-col>

        <v-col cols="12">
          <v-list-item>
            <v-list-item-subtitle>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-img
                    class="condition_img"
                    v-bind="attrs"
                    v-on="on"
                    :src="`http://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`"
                    width="40"
                    max-width="40"
                    position="-8px 0px"
                    contain
                  ></v-img>
                </template>
                <span class="text-uppercase">{{
                  cityData.weather[0].description
                }}</span>
              </v-tooltip></v-list-item-subtitle
            >
            <v-list-item-title>{{
              cityData.weather[0].main
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="cityData.displayField.min_max">
            <v-list-item-subtitle>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on"
                    >mdi-thermometer-lines</v-icon
                  >
                </template>
                <span class="text-uppercase">Max/Min Temperature</span>
              </v-tooltip></v-list-item-subtitle
            >
            <v-list-item-title
              >{{ cityData.main.temp_min.toFixed(0) }}&deg;C /
              {{ cityData.main.temp_max.toFixed(0) }}&deg;C</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="cityData.displayField.rise_set">
            <v-list-item-subtitle
              ><v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-weather-sunset</v-icon>
                </template>
                <span class="text-uppercase">Sunrise/Sunset time</span>
              </v-tooltip></v-list-item-subtitle
            >
            <v-list-item-title
              >{{ cityData.sys.sunrise | timesStampToDate("HH:mm") }} /
              {{
                cityData.sys.sunset | timesStampToDate("HH:mm")
              }}</v-list-item-title
            >
          </v-list-item>

          <v-list-item v-if="cityData.displayField.wind">
            <v-list-item-subtitle>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-weather-windy</v-icon>
                </template>
                <span class="text-uppercase">Wind speed</span>
              </v-tooltip>
            </v-list-item-subtitle>
            <v-list-item-title>{{ cityData.wind.speed }} m/s</v-list-item-title>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" persistent max-width="540">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5"> Remove </v-card-title>
          <v-card-text>Are you sure you want to remove this city?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="red darken-1" text @click="onRemoveCity"> Yes </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "City",
  props: {
    cityData: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    onRemoveCity() {
      this.dialog = false;
      this.$store.dispatch("removeCityWeather", this.cityData);
      this.$store.dispatch("removeCity", this.cityData);
    },
  },
});
</script>

<style lang="scss" scoped>
.city_name {
  font-weight: 700;
  color: #737373;
  font-family: "Abril Fatface", cursive !important;
}
.degree_div {
  .degree {
    font-weight: 900;
    color: #737373;
    font-family: "Abril Fatface", cursive !important;
    margin-right: 1rem;
  }
}

.card-content {
  margin-top: 2rem;
  height: calc(100% - 64px - 52px - 2rem);

  .condition_img {
    position: relative;
  }
}

.v-tooltip {
  text-transform: uppercase;
}
</style>
