import { createApp, Vue } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLoadImage from "vue-load-image";


import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far, fab)
dom.watch();


import 'ckeditor5/ckeditor5.css';
//import "../node_modules/bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css'

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;


import { createHead } from '@unhead/vue'
const head = createHead()


createApp(App)

.use(head)
.use(store)
.use(router)
.component("font-awesome-icon", FontAwesomeIcon)
.component("vue-load-image", VueLoadImage)
.mount('#app')
