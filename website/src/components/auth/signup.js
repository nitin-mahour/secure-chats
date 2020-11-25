import React, { Component } from 'react'
import Cookies from 'js-cookie'
import { PreloaderSmall } from '../anim/preloader'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import sha256 from 'sha256'


export class SignUp extends Component {
    state = {
        username: '',
        password: '',
        password2: '',
        error: null,
        loading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.password === this.state.password2) {

            this.setState({
                loading: true
            })

            let creds = new FormData()
            creds.append('usr', this.state.username)
            creds.append('pwd', sha256.x2(this.state.password))

            fetch(`${API_URL}/auth/signup.php`, {
                method: 'POST',
                body: creds
            }).then(res => res.json())
                .then(data => {
                    if (data === 'SIGNUP_SUCCESS') {
                        Cookies.set('authorised', true, { expires: 7 })
                        Cookies.set('username', this.state.username, { expires: 7 })
                        Cookies.set('password', sha256.x2(this.state.password), { expires: 7 })
                        this.props.setAuth(true)
                    }
                    else if (data === 'USERID_NOT_AVAILABLE') {
                        this.setState({
                            error: 'Username Is Already Taken!',
                            loading: false
                        })
                    }
                    else {
                        console.log(data);
                        this.setState({
                            error: 'Network Error!',
                            loading: false
                        })
                    }
                })
                .catch(err => console.log(err))
        }
        else {
            this.setState({
                error: 'Both Passwords Do Not Match!'
            })
        }
    }

    render() {
        return (
            <div className="text-center max-w-sm mx-auto my-auto">

                <h1 className="fixed inset-x-0 top-0 mt-8 text-3xl text-gray-600">SECURE_CHATS</h1>

                <div className="bg-gray-700 shadow rounded-lg p-8">

                    {/* log in form */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex items-center">
                            <span className="w-1/6">
                                <svg className="w-8 mb-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </span>
                            <input type="text" name="username" placeholder="Username" onChange={this.handleChange} className="w-5/6 appearance-none bg-transparent border-b-2 border-gray-900 focus:border-gray-600 text-gray-400 text-lg py-2 focus:outline-none mb-4 placeholder-gray-900" required autoFocus />
                        </div>
                        <div className="flex items-center">
                            <span className="w-1/6">
                                <svg className="w-8 mb-3 text-gray-900" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                            </span>
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} className="w-5/6 appearance-none bg-transparent border-b-2 border-gray-900 focus:border-gray-600 text-gray-400 text-lg py-2 focus:outline-none mb-4 placeholder-gray-900" required />
                        </div>
                        <div className="flex items-center">
                            <span className="w-1/6">
                                <svg className="w-8 mb-3 text-gray-900" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                            </span>
                            <input type="password" name="password2" placeholder="Confirm Password" onChange={this.handleChange} className="w-5/6 appearance-none bg-transparent border-b-2 border-gray-900 focus:border-gray-600 text-gray-400 text-lg py-2 focus:outline-none mb-4 placeholder-gray-900" required />
                        </div>
                        <div className="flex justify-center mt-2">
                            <button type="submit" className="bg-gray-900 w-32 py-2 text-gray-400 focus:outline-none rounded-full transform hover:scale-110 duration-500 flex justify-center">
                                {
                                    this.state.loading
                                        ? (
                                            <PreloaderSmall />
                                        ) : (
                                            <>SIGN UP</>
                                        )
                                }
                            </button>
                        </div>
                    </form>

                </div>


                {/* login errors */}
                <div className="text-lg text-red-600 text-center mt-8 max-w-sm">
                    {this.state.error && this.state.error}
                </div>

                {/* sign in button */}
                <span className="block text-gray-500 text-sm mt-12 mb-2">Already Registered? Click Below</span>
                <Link to="/">
                    <button className="border-gray-600 border-2 rounded-full text-gray-500 py-2 px-5 text-sm transform hover:scale-110 duration-500">
                        SIGN IN
                    </button>
                </Link>

            </div>
        )
    }
}

export default SignUp
