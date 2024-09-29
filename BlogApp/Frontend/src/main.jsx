import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './store/index.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from './components/index.js'
createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider childern={<App />} />


    </Provider>
  </PersistGate>

)
