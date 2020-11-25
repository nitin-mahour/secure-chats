import React, { Component } from 'react'
import PreloaderSmall from '../anim/preloader'

export default class dashboard extends Component {

    state = {
        roomid: '',
        key: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.setRoom(true)
        this.props.setRoomid(this.state.roomid)
        this.props.setEnckey(this.state.key)
    }

    render() {
        return (
            <div className="text-center max-w-sm mx-auto my-auto">

                <div className="bg-gray-700 shadow rounded-lg p-8">

                    {/* log in form */}
                    <form onSubmit={this.handleSubmit}>
                        <div className="flex items-center">
                            <span className="w-1/6">
                                <svg className="w-8 mb-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            </span>
                            <input type="text" name="roomid" placeholder="Room ID" onChange={this.handleChange} className="w-5/6 appearance-none bg-transparent border-b-2 border-gray-900 focus:border-gray-600 text-gray-400 text-lg py-2 focus:outline-none mb-4 placeholder-gray-900" required autoFocus />
                        </div>
                        <div className="flex items-center">
                            <span className="w-1/6">
                                <svg className="w-8 mb-3 text-gray-900" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                            </span>
                            <input type="password" name="key" placeholder="Encryption Key" onChange={this.handleChange} className="w-5/6 appearance-none bg-transparent border-b-2 border-gray-900 focus:border-gray-600 text-gray-400 text-lg py-2 focus:outline-none mb-4 placeholder-gray-900" required />
                        </div>
                        <div className="flex justify-center mt-2">
                            <button type="submit" className="bg-gray-900 px-4 py-2 text-gray-400 focus:outline-none rounded-full transform hover:scale-110 duration-500 flex justify-center">
                                {
                                    this.state.loading
                                        ? (
                                            <PreloaderSmall />
                                        ) : (
                                            <>ENTER ROOM</>
                                        )
                                }
                            </button>
                        </div>
                    </form>

                </div>



                {/* errors */}
                <div className="text-lg text-red-600 text-center mt-8 max-w-sm">
                    {this.props.authError && this.props.authError}
                </div>

            </div>
        )
    }
}
