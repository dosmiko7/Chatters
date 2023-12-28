import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./style/GlobalStyles";

import DarkThemeProvider from "./context/DarkThemeContext";
import LoggedUserProvider from "./context/LoggedUserContext";
import AppLayout from "./ui/AppLayout";
import WelcomeLayout from "./ui/WelcomeLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Profiles from "./features/profiles/Profiles";
import Chat from "./pages/Chat";
import Chats from "./features/chats/Chats";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";

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
				<LoggedUserProvider>
					<BrowserRouter>
						<Routes>
							<Route
								element={
									<ProtectedRoute>
										<AppLayout />
									</ProtectedRoute>
								}
							>
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
									path="settings"
									element={<Settings />}
								/>
								<Route
									path="profile"
									element={<Profiles />}
								/>
								<Route
									path="profile/:userId"
									element={<Profile />}
								/>
								<Route
									path="chat"
									element={<Chats />}
								/>
								<Route
									path="chat/:combinedId"
									element={<Chat />}
								/>
							</Route>
							<Route element={<WelcomeLayout />}>
								<Route
									index
									path="login"
									element={<Login />}
								/>
								<Route
									path="register"
									element={<Register />}
								/>
							</Route>
							<Route
								path="*"
								element={<PageNotFound />}
							/>
						</Routes>
					</BrowserRouter>
				</LoggedUserProvider>
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
