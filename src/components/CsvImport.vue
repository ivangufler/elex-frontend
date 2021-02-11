<template>
  <div>
    
    <div>
      <input
        :id="id"
        name="csv-file"
        type="file"
        @change="parseFile($event.target.files[0])"
        accept=".csv"
        class="w-0 h-0 opacity-0 overflow-hidden absolute -z-1"
      />
    </div>
    
    <p class="text-red-500 m-3 font-cfont text-sm" v-if="error">Die hochgeladene Datei ist keine CSV-Datei</p>
    <div v-else-if="columns > 1" class="flex flex-col items-end font-cfont bg-gray-200 p-4 mb-3 rounded-lg" >
      <div class="flex flex-col">
        <div>
        <input class="mr-3" :id="id + '-check'" type="checkbox" v-model="hasHeaders" />
      <label :for="id + '-check'">CSV mit Spaltenüberschrifft</label>
      </div>
      <select v-model="selectedHeader" class="focus:outline-none border-b-2 border-gray-600 bg-transparent mt-3">
        <option value="" selected disabled hidden>Spalte auswählen</option>
        <option
          :value="index"
          v-for="(h, index) in hasHeaders ? headers : noHeaders"
          :key="index"
        >
          {{ h }}
        </option>
      </select>
      </div>
      <button @click="parseColumn()" :disabled="selectedHeader === '' " class="mt-5 bg-gray-400 p-2 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" >OK</button>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";

export default {
  data() {
    return {
      columns: 0,
      headers: [],
      noHeaders: [],
      data: {},
      hasHeaders: true,
      selectedHeader: "",
      error: false,
    };
  },

  props: {
    id: null,
  },

  methods: {
    emitDataToParent(data) {
      this.$emit("parsed", data);
    },

    reset() {
      this.headers = [];
      this.noHeaders = [];
      this.data = {};
      this.columns = 0;
      this.selectedHeader = "";
      this.error = false;
    },

    parseColumn() {
      let mappedCsv = [];
      let index = 0;
      if (this.columns > 1) index = this.selectedHeader;

      if (this.hasHeaders) this.data.shift();

      this.data.forEach((row) => {
        if (row[index] && row[index].trim().length > 0) {
          mappedCsv.push(row[index].trim());
        }
      });
      this.emitDataToParent(mappedCsv);
      this.reset();
    },

    parseFile(file) {
      if (file.type !== "text/csv") {
        this.error = true;
        return;
      }
      this.reset();
      var _this = this;

      Papa.parse(file, {
        complete: function (results) {
          _this.columns = results.data[0].length;
          _this.data = [...results.data];
          _this.headers = [...results.data[0]];

          for (let i = 0; i < _this.columns; i++)
            _this.noHeaders.push("Spalte" + (i + 1));

          if (_this.columns === 1) {
            _this.selectedHeader = _this.headers[0];
            _this.parseColumn();
          }
        },
      });
    },
  },
};
</script>
