import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Base from './components/Base'

const app = createApp(App)

// registration base components
Base.forEach(component => app.component(component.name, component))

app.use(store).mount('#app')
