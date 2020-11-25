import React, { useState } from 'react'
import Cookies from 'js-cookie'
import Dashboard from './dashboard'
import Room from './room'

export default function Home({ setAuth }) {

    const [room, setRoom] = useState(false)
    const [roomid, setRoomid] = useState(null)
    const [enckey, setEnckey] = useState(null)
    const [popup, setPopup] = useState(false)

    const logout = () => {
        Cookies.remove('authorised')
        Cookies.remove('username')
        Cookies.remove('password')
        setAuth(false)
    }
    
    return (
        <>
            <div className="container flex flex-col mx-auto pb-4 text-gray-400" style={{ height: "100vh" }}>

                <div style={{ height: "5vh" }}>
                    {
                        // back button
                        room ? (
                            <div className="float-left cursor-pointer m-4" onClick={() => { setRoom(false); setRoomid(null) }}>
                                <svg className="w-8 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
                            </div>
                        ) : null
                    }


                    {/* a/c info icon */}
                    <div className="float-right cursor-pointer m-4" onClick={() => setPopup(!popup)}>
                        <p className="inline text-lg align-middle">{Cookies.get('username') && Cookies.get('username').toUpperCase()}</p>
                        <svg className="w-8 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                    </div>

                    {
                        // popup menu
                        popup ? (
                            <div className="fixed relative h-screen" onClick={() => setPopup(!popup)}>

                                <div className="bg-black h-full opacity-50 z-10"></div>

                                <div className="absolute top-0 right-0 bg-gray-600 rounded-2xl py-8 px-16 mt-12 mr-4 z-20">
                                    <button className="text-gray-900" onClick={() => logout()}>LOGOUT</button>
                                </div>

                            </div>
                        ) : null
                    }

                </div>


                {
                    room
                        ? <Room roomid={roomid} enckey={enckey} />
                        : <Dashboard setRoom={setRoom} setRoomid={setRoomid} setEnckey={setEnckey} />
                }

            </div>


        </>
    )
}

