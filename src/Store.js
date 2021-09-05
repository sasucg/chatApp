import React from 'react'

export const Store = React.createContext();

const initialState = { 
    userLoggedinId: 'fd9a479d-8b7c-4840-8bb5-c75a642ea5c3',
    userLoggedinName: 'Emmily Sheffield',
    authToken: '',
    refreshToken: '',
    channelNameSelected: '',
    selectedChannel: '',
    oldSelectedChannel: ''
};

function reducer(state, action) {
    switch(action.type){
        // case 'SEND_MESSAGE': 
        //     return{...state, messageList: [...state.messageList, action.payload]};

        case 'SELECT_CHANNEL':
            return{...state, oldSelectedChannel: state.selectedChannel, selectedChannel: action.payload}
        
        case 'SELECT_CHANNEL_NAME':
            return{...state, channelNameSelected: action.payload}
        // case 'FETCH_DATA':
        //     return{...state, episodes: action.payload};
        // case 'ADD_FAV':
        //     return{...state, favorites: [...state.favorites, action.payload]};
        // case 'REMOVE_FAV':
        //     return {
        //         ...state,
        //         favorites: action.payload
        //     };
        default: 
            return state;
    } 

}

export function StoreProvider(props) { 

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}> 
            {props.children} 
           </Store.Provider>
}