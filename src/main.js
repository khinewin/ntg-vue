import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

createApp(App).use(store).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
