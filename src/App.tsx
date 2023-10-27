import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GlobalStyles from "./style/GlobalStyles";

const App = () => {
	return (
		<>
			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Login />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
