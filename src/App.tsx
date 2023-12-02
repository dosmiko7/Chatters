import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./style/GlobalStyles";

import RegisterForm from "./features/authentication/RegisterForm";
import LoginForm from "./features/authentication/LoginForm";
import { Toaster } from "react-hot-toast";
//import ProtectedRoute from "./ui/ProtectedRoute"; TODO: Add as wrapper to Route with <AppLayout/>
import AppLayout from "./ui/AppLayout";
import Dashboard from "./ui/Dashboard";
import Profile from "./features/profiles/Profile";
import Chat from "./features/chats/Chat";
import DarkThemeProvider from "./context/DarkThemeContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 0,
		},
	},
});

const App = () => {
	return (
		<DarkThemeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition="bottom-left"
				/>
				<GlobalStyles />
				<BrowserRouter>
					<Routes>
						<Route element={<AppLayout />}>
							<Route
								index
								element={
									<Navigate
										replace
										to="dashboard"
									/>
								}
							/>
							<Route
								path="dashboard"
								element={<Dashboard />}
							/>
							<Route
								path="profile/:userId"
								element={<Profile />}
							/>
							<Route
								path="chat/:combinedId"
								element={<Chat />}
							/>
						</Route>
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
				<Toaster
					position="top-center"
					gutter={12}
					containerStyle={{ margin: "8px" }}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							fontSize: "16px",
							maxWidth: "500px",
							padding: "16px 24px",
							backgroundColor: "var(--color-primary-25)",
							color: "var(--color-primary-500)",
						},
					}}
				/>
			</QueryClientProvider>
		</DarkThemeProvider>
	);
};

export default App;
