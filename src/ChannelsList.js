import React from 'react'
import { Component } from 'react'
import './App.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Channel from './Channel'
import Dashboard from './Dashboard'
import { Store } from './Store'

class ChannelsList extends Component {

    constructor() {
        super()
        // this.getChannels()
    }


    // getChannels = () => {
    //     const options = {
    //         headers: { 'Authorization': 'Bearer ' + this.state.authToken }
    //     }
    //     axios.get('http://localhost:8000/chat/getChannels/', options)
    //         .then(function (response) {
    //             this.setState({
    //                 idCanal: response.data.id,
    //                 nume: response.data.nume,
    //                 usersInChannel: response.data.users
    //             })
    //         })
    //         .catch(function (error) {
    //             console.log(error);

    //         })
    // }
    context = this.context;
    render() {
        let allChannels = this.context.state.allChannels;
        return (
            <div className="left-component">
                <div className="owner">
                    Test
                </div>
                {
                    allChannels.map((currChannel, i) => (
                        <Channel className="channel"
                            key={i}
                            channelID={currChannel.id.S}
                            channelName={currChannel.name.S}
                        />
                    ))
                }
            </div>
        )
    }
}
ChannelsList.contextType = Store

export default ChannelsList