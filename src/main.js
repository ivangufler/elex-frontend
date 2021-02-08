import moment from 'moment';
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'

const app = createApp(App);

app.use(router).mount('#app')
app.config.globalProperties.$filters = {
    formatDate(value) {
        return moment(String(value)).format('DD/MM/YYYY - HH:mm');
    }
  }
