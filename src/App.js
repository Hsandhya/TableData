import Table from './Components/Table'
import { Provider } from 'react-redux';
import store from './store/store';


function App() {
  return (
    <>
    <Provider store={store}>
    <Table />
   </Provider>
    </>
  );
}

export default App;
