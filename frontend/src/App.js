
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import NavBar from './components/NavBar';
import LoginScreen from './screen/LoginScreen';
import SignupScreen from './screen/SignupScreen';
import UploadScreen from './screen/UploadScreen';
import ImageScreen from './screen/ImageScreen';
import DetailScreen from './screen/DetailScreen';

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/home' element={<ImageScreen />} />
        <Route path='/signup' element={<SignupScreen />} />
        <Route path='/upload' element={<UploadScreen />} />
        <Route path='/home/:id' element={<DetailScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
