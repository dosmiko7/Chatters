import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./style/GlobalStyles";

import RegisterForm from "./features/authentication/RegisterForm";
import LoginForm from "./features/authentication/LoginForm";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
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
		</QueryClientProvider>
	);
};

export default App;
