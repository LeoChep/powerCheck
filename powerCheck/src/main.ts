import { createApp } from 'vue'
import './style.css'
import  Test from "../lib/view/test.vue"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app=createApp(Test)
app.use(ElementPlus)
app.mount("#app")