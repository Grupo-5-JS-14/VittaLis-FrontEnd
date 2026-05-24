import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Toaster } from "sonner"

import { AuthProvider } from "./contexts/AuthContext"

import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"

function App() {

	return (

		<AuthProvider>

			<BrowserRouter>

				<div className="min-h-screen bg-background">

					<Routes>

						<Route
							path="/"
							element={<Login />}
						/>

						<Route
							path="/login"
							element={<Login />}
						/>

						<Route
							path="/cadastro"
							element={<Cadastro />}
						/>

					</Routes>

				</div>

				<Toaster
					position="top-right"
					richColors
					closeButton
					toastOptions={{
						style: {
							background: '#FFFFFF',
							border: '1px solid #DCE7E3',
							color: '#12312F',
							borderRadius: '16px',
							padding: '16px',
						},
					}}
				/>

			</BrowserRouter>

		</AuthProvider>
	)
}

export default App