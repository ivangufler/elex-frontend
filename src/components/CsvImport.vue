<template>
  <input
    :id="id"
    name="csv-file"
    type="file"
    @change="parseFile($event.target.files[0])"
    accept=".csv"
    class="w-0 h-0 opacity-0 overflow-hidden absolute -z-1"
  />
  <div>
    <input :id="id + '-check'" type="checkbox" v-model="hasHeaders"/>
    <label :for="id + '-check'">Spaltenüberschriften</label>
  </div>
  <p v-if="error">Die hochgeladene Datei ist keine CSV-Datei</p>
  <div v-else-if="columns > 1">
    <select v-model="selectedHeader">
      <option value="" selected disabled hidden>Spalte auswählen</option>
      <option :value="index" v-for="(h, index) in hasHeaders ? headers : noHeaders" :key="index">{{ h }}</option>
    </select>
    <button @click="parseColumn()">Ok</button>
  </div>


</template>

<script>
import Papa from 'papaparse';

export default {

  data() {
    return {
      columns: 0,
      headers: [],
      noHeaders: [],
      data: {},
      hasHeaders: true,
      selectedHeader: '',
      error: false,
    }
  },

  props: {
    id: null,
  },

  methods: {
    emitDataToParent(data) {
      this.$emit('parsed', data);
    },

    reset() {
      this.headers = [];
      this.noHeaders = [];
      this.data = {};
      this.columns = 0;
      this.selectedHeader = '';
      this.error = false;
    },

    parseColumn() {
      let mappedCsv = [];
      let index = 0;
      if (this.columns > 1)
        index = this.selectedHeader;
      
      if (this.hasHeaders)
        this.data.shift();

      this.data.forEach(row => {
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
        complete: function(results) {

          _this.columns = results.data[0].length;
          _this.data = [...results.data];
          _this.headers = [...results.data[0]];
         
          for (let i = 0; i < _this.columns; i++)
            _this.noHeaders.push('Spalte' + (i+1));

          if (_this.columns === 1) {
            _this.selectedHeader = _this.headers[0];
            _this.parseColumn();
          }
        }
      });
    },
  }

}
</script>

<style>

</style>