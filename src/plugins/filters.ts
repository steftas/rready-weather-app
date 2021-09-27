import Vue from "vue";
import moment from "moment";

Vue.filter("timesStampToDate", (value: number, format: string) => {
  if (value) {
    return moment.unix(value).format(format || "YYYY-MM-DD");
  }
  return value;
});

export default {};
