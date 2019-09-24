import React from 'react'
import { Component } from 'react'
import './App.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Channel from './Channel'
import Dashboard from './Dashboard'
import { Store } from './Store'

class ChannelsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allChannels: []
        }
    }


    componentDidMount = () => {
        
        // fetch("http://app-prod.b4cjkb3nwe.eu-west-1.elasticbeanstalk.com/chat/getChannelsOfUser/029a1a22-8ede-4f4d-9dfd-b54e750b274d/")
        // .then(res => res.json())
        // .then(channels => this.setState({allChannels: channels}))
        var obj = this;
        axios.get('http://app-prod.b4cjkb3nwe.eu-west-1.elasticbeanstalk.com/chat/getChannelsOfUser/fd9a479d-8b7c-4840-8bb5-c75a642ea5c3/')
        .then(function (response) {
            obj.setState({allChannels: response.data})
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    context = this.context;
    render() {
        let allChannels = this.state.allChannels;
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