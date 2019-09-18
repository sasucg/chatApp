import React from 'react'
import {Component} from 'react'
import './App.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Channel from './Channel'
import Dashboard from './Dashboard'

class ChannelsList extends Component { 

    state = {
      channelsVector: []
    }

    constructor() {
        super()
        this.getChannels()
    }


    getChannels = () => { 
        const options = {
            headers: {'Authorization': 'Bearer ' + this.state.authToken}
        }
        axios.get('http://localhost:8000/chat/getChannels/', options)
        .then(function(response){
            this.setState({
                idCanal: response.data.id,
                nume: response.data.nume,
                usersInChannel: response.data.users
            })
        })
        .catch(function(error){
            console.log(error);
            
        })
    }

    render(){
        return(
            <div className="channels-list">
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>
                 <Channel name="Canal1" numar="1" lastMessage="buna"/> 
                 <Channel name="Canal2" numar="2" lastMessage="buna"/>

            </div>
        )
    }
}

export default ChannelsList