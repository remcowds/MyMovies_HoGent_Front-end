import './App.css';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import MoviePage from './pages/MoviePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { MovieProvider } from './contexts/MovieProvider';
import { CategoryProvider } from './contexts/CategoryProvider';
import { DirectorProvider } from './contexts/DirectorProvider';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<AuthProvider>
			<MovieProvider>
				<CategoryProvider>
					<DirectorProvider>
						<HashRouter>
							<Switch>
								<Route exact path='/'>
									<Redirect to='/home' />
								</Route>
								<Route exact path='/home'>
									<Home />
								</Route>
								<Route exact path='/login'>
									<Login />
								</Route>
								<Route exact path='/register'>
									<Register />
								</Route>
								<PrivateRoute exact path='/about'>
									<About />
								</PrivateRoute>
								<PrivateRoute exact path='/contact'>
									<Contact />
								</PrivateRoute>
								<PrivateRoute exact path='/movie/:id'>
									<MoviePage />
								</PrivateRoute>
								<Route path='*'>
									<NotFound />
								</Route>
							</Switch>
						</HashRouter>
					</DirectorProvider>
				</CategoryProvider>
			</MovieProvider>
		</AuthProvider>
	);
}

export default App;
