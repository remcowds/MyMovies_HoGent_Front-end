import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import * as userAPI from '../API/users';
import config from '../config.json';
import * as api from '../API/indexAPI';

const AuthContext = createContext();
const JWT_TOKEN_KEY = config.token_key;

//get context
const useAuth = () => {
	return useContext(AuthContext);
};

// loading, token, user, ready, error uit de context returnen
export const useSession = () => {
	const { loading, token, user, ready, error } = useAuth();
	return { loading, token, user, ready, error, isAuthed: Boolean(token) };
};

//de login ftie van in de context returnen
export const useLogin = () => {
	const { login } = useAuth();
	return login;
};

//de logout ftie van in de context returnen
export const useLogout = () => {
	const { logout } = useAuth();
	return logout;
};

//de register ftie van in de context returnen
export const useRegister = () => {
	const { register } = useAuth();
	return register;
};

const parseJWT = (token) => {
	if (!token) return {};
	const base64Url = token.split('.')[1];
	const payload = Buffer.from(base64Url, 'base64');
	const jsonPayload = payload.toString('ascii');
	return JSON.parse(jsonPayload);
};

const parseExp = (exp) => {
	if (!exp) return null;
	if (typeof exp !== 'number') exp = Number(exp);
	if (isNaN(exp)) return null;
	return new Date(exp * 1000);
};

export const AuthProvider = ({ children }) => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);

	const setSession = useCallback((token) => {
		const { exp: expJWT } = parseJWT(token);
		const expiry = parseExp(expJWT);

		const stillValid = expiry >= new Date();

		if (stillValid) {
			localStorage.setItem(JWT_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(JWT_TOKEN_KEY);
			token = null;
		}

		api.setAuthToken(token);
		setToken(token);
		setReady(stillValid);
	}, []);

	const login = useCallback(
		async (email, ww) => {
			try {
				setLoading(true);

				const { token, user } = await userAPI.login(email, ww);

				setSession(token);
				setUser(user);
				return true;
			} catch (error) {
				setError(error.response.data.message);
				return false;
			} finally {
				setLoading(false);
			}
		},
		[setSession]
	);

	const logout = useCallback(() => {
		setSession(null);
		setUser(null);
	}, [setSession]);

	const register = useCallback(
		async (email, username, ww) => {
			try {
				setLoading(true);

				const { token, user } = await userAPI.register(
					email,
					username,
					ww
				);

				setSession(token);
				setUser(user);

				return true;
			} catch (error) {
				if (error.response.data.message.includes('Duplicate entry')) {
					setError('User already exists!');
				} else {
					setError(error.response.data.message);
				}
				return false;
			} finally {
				setLoading(false);
			}
		},
		[setSession]
	);

	useEffect(() => {
		setReady(Boolean(token));

		api.setAuthToken(token);

		if (token) {
			localStorage.setItem(JWT_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(JWT_TOKEN_KEY);
		}
	}, [token]);

	const value = useMemo(
		() => ({
			error,
			token,
			user,
			loading,
			login,
			logout,
			register,
			ready,
		}),
		[error, token, user, loading, login, logout, register, ready]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
