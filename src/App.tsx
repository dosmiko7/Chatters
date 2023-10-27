import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./style/GlobalStyles";
import RegisterForm from "./features/authentication/RegisterForm";
import LoginForm from "./features/authentication/LoginForm";

const App = () => {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route
						index
						element={
							<Navigate
								replace
								to="login"
							/>
						}
					/>
					<Route
						path="login"
						element={<LoginForm />}
					/>
					<Route
						path="register"
						element={<RegisterForm />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
