import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/signup'
import Home from './components/home/home'
import Cookies from 'js-cookie'

function App() {

	const [auth, setAuth] = useState(Cookies.get('authorised'))

	return (
		<div className='bg-gray-900 font-sans h-screen w-screen flex flex-col place-content-center'>
			<Router>
				{
					!auth ? (
						<Switch>
							<Route exact path='/'>
								<SignIn setAuth={setAuth} />
							</Route>
							<Route path='/signup'>
								<SignUp setAuth={setAuth} />
							</Route>
						</Switch>
					) : (
							<Home setAuth={setAuth} />
						)
				}
			</Router>
		</div>
	)
}


export default App
