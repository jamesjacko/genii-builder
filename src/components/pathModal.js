import React, { Component } from 'react';

class PathModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataPoints: props.dataPoints,
            pathPoints: []
        }
    }
    distance(a, b){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
    handleSVGClick(e){
        if(this.state.dataPoints > 0){
            const rect = e.target.getBoundingClientRect();
            let points = this.state.pathPoints;
            points.push({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })
            this.setState({
                pathPoints: points
            })
            if(points.length > 1){
                this.setState({
                    dataPoints: this.state.dataPoints - 1
                })
            }
        }
    }
    handleDoneClick(){
        let path = [];
        let point, dist;
        let multiplier = this.props.size / this.props.canvasSize;
        console.log(multiplier);
        this.state.pathPoints.forEach((element, index) => {
            if(typeof this.state.pathPoints[index + 1] !== "undefined"){
                point = {
                    a:{
                        x: element.x * multiplier,
                        y: element.y * multiplier
                    },
                    b:{
                        x: this.state.pathPoints[index + 1].x * multiplier,
                        y: this.state.pathPoints[index + 1].y * multiplier
                    }
                }
                dist = this.distance(point.a, point.b) * multiplier
                point.dist = dist
                path.push(point)
            }
        });
        this.props.pathHandler(path)
    }
    render(){
        const renderPoints = this.state.pathPoints.map((item, index) => {
            let path = <g></g>
            if(typeof this.state.pathPoints[index + 1] !== "undefined"){
                path = <path 
                    d={ "M" + item.x + " " + item.y + "L" + this.state.pathPoints[index + 1].x + " " + this.state.pathPoints[index + 1].y + "Z"} 
                    stroke="grey"
                    strokeWidth="1" />
            }
            return(
                <g>
                    <circle
                        cx={ item.x }
                        cy={ item.y }
                        r={ 3 }
                        stroke="none"
                        fill="red"
                        key={ "point" + index }
                    />
                    { path }
                </g>
            )
        })
        
        return(
            <div className="pathModalContainer">
                
                <div className="pathModal">
                    <p>Create Path: { this.state.dataPoints } points remaining 
                    <button 
                        disabled={ this.state.dataPoints != 0 }
                        onClick={ () => this.handleDoneClick() }>
                            finish</button></p>
                    <svg className="pathCanvas" width={ this.props.canvasSize } height={ this.props.canvasSize } onClick={ (e) => this.handleSVGClick(e) }>
                        { renderPoints }
                    </svg>
                </div>
            </div>
        )
    }
}

export default PathModal