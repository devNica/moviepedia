import './App.css';
import Container from './components/container/Container';
import store from './redux/store';
import { Provider } from 'react-redux'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Container />
      </Provider>

    </div>
  );
}

export default App;
