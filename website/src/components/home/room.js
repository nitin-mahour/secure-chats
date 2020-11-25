import React, { Component } from 'react'
import Cookies from 'js-cookie'
import moment from 'moment'
import aes256 from 'aes256'
import { API_URL } from '../../config'

export default class Room extends Component {

    state = {
        chat: [],
        error: null,
        iter: -1,
        intervalID: null,
        user: Cookies.get('username'),
        loaded: false
    }

    componentDidMount() {
        this.loop()
    }

    componentWillUnmount() {
        this.setState({ iter: -1, loaded: false })
        clearInterval(this.state.intervalID)
    }

    getMsgs = () => {
        fetch(`${API_URL}/chat/get.php?room=${this.props.roomid}&key=${this.state.iter}`)
            .then(res => res.json())
            .then(data => {
                if (this.state.iter !== data[Object.keys(data).length - 1].msg_id) {
                    this.setState({
                        chat: [...this.state.chat, ...data],
                        iter: data[Object.keys(data).length - 1].msg_id,
                        loaded: true
                    })
                    let list = document.getElementById('chat-list')
                    list.scrollBy(0, list.scrollHeight)
                } else {
                    console.log('synced');
                }
            }).catch(err => this.setState({
                error: err
            }))

    }

    loop = () => {
        this.setState({
            intervalID: setInterval(() => {
                this.getMsgs()
            }, 1000)
        })
    }

    sendMsg = (e) => {
        e.preventDefault()

        if ((e.target['mssg'].value).toString()) {

            let item = new FormData()
            item.append('room', this.props.roomid)
            item.append('user', aes256.encrypt(
                this.props.enckey,
                this.state.user
            ))
            item.append('mssg', aes256.encrypt(
                this.props.enckey,
                (e.target['mssg'].value).toString()
            ))

            fetch(`${API_URL}/chat/post.php`, {
                method: 'POST',
                body: item
            })
            // .then(res => res.json())
            // .then(data => console.log(data))

            e.target['mssg'].value = ''
        }

    }

    showTime = (at) => {
        let ts = moment(at).calendar().toLowerCase()
        if (ts.substr(0, 5) === 'today') {
            ts = ts.substr(9)
        }
        return ts
    }

    render() {
        return (
            <>
                <div className="border-2 rounded-2xl border-gray-700 m-2" style={{ height: "80vh" }}>

                    <p className="text-2xl text-gray-500 text-center w-full p-2" style={{ height: "5vh" }}>{(this.props.roomid)} </p>

                    <div className="overflow-y-scroll p-2" style={{ height: "74vh" }} id="chat-list">
                        {
                            this.state.loaded && this.state.chat.map(item => {

                                if (item.msg_id > -1) {
                                    if (this.state.user === aes256.decrypt(this.props.enckey, item.sender)) {
                                        return (
                                            <div className="my-1 flex flex-row-reverse" key={item.msg_id}>
                                                <span className="bg-gray-700  text-gray-900 leading-tight rounded-3xl px-4 pb-1 pt-2">
                                                    <span className="text-lg pr-2 break-all">{aes256.decrypt(this.props.enckey, item.message)}</span>
                                                    <span className="text-xs text-right oldstyle-nums block">{this.showTime(item.sent_at)}</span>
                                                </span>
                                            </div>
                                        )
                                    }
                                    else {
                                        return (
                                            <div className="my-1 flex flex-row" key={item.msg_id}>
                                                <span className="bg-gray-600 text-gray-900 leading-tight rounded-3xl px-4 pb-1 pt-2">
                                                    <span className="text-base font-semibold italic">{aes256.decrypt(this.props.enckey, item.sender)}</span>
                                                    <span className="text-lg px-2 break-all">{aes256.decrypt(this.props.enckey, item.message)}</span>
                                                    <span className="text-xs text-left oldstyle-nums block">{this.showTime(item.sent_at)}</span>
                                                </span>
                                            </div>
                                        )
                                    }
                                } else {
                                    return null
                                }
                            })
                        }
                    </div>

                </div>

                <form className="w-full pl-4 pr-2" onSubmit={this.sendMsg}>
                    <div className="flex mx-4">
                        <input type="text" name="mssg" className="flex-1 outline-none appearance-none bg-transparent border-b-2 border-gray-600 py-1 px-2 text-gray-200 placholder-gray-600 focus:border-gray-400" placeholder="Type message" autoComplete="off" autoFocus />
                        <button type="submit" className="flex-0 inline ml-2 text-gray-900 outline-none focus:outline-none font-medium bg-gray-700 p-2 rounded-full">SEND</button>
                    </div>
                </form>
            </>
        )
    }
}
