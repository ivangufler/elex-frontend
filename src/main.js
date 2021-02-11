import moment from 'moment';
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import {VueCsvImportPlugin} from "vue-csv-import";

const app = createApp(App);

app.use(router).mount('#app');
app.use(VueCsvImportPlugin);
app.config.globalProperties.$filters = {
    formatDate(value) {
        return moment(String(value)).format('DD/MM/YYYY - HH:mm');
    }
  }
