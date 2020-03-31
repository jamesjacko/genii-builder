import React, { Component } from 'react'
import PathModal from './pathModal'


class CreatePath extends Component{
    constructor(props){
        super(props)
        this.state = {
            showModal: false,
            dataPoints: 10
        }
    }
    loadCreatePathPane(){
        console.log(this.state)
        this.setState({showModal: true})
    }
    handlePath(path){
        this.setState({
            customPath: path
        });
        console.log(path)
    }
    render(){
        let modal;
        if(this.state.showModal){
            modal = <PathModal dataPoints={ this.state.dataPoints } size={ 800 } canvasSize={ 450 } pathHandler={ (path) => this.handlePath(path) } />
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