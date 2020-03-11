import React, { Component } from 'react'

class CreatePath extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false
        }
    }
    loadCreatePathPane(){
        console.log(this.state)
        this.setState({showModal: true})
    }
    render(){
        let modal;
        if(this.state.showModal){
            modal = <p>Hello</p>
        }
        return(
            <div>
                <button onClick={ () => this.loadCreatePathPane() }>Create Path</button>
                { modal }
            </div>
        )
    }
}

export default CreatePath;