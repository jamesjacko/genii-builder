import React, { Component } from "react";
import { getOpenResponses, getMURVGenes } from "../utils/firebase";
import MURV, { Gene as MurvGene } from 'murv-component';
import Config, { Config1, Config2 } from '../config.js';

 class Results extends Component{
   constructor(props){
     super(props);
     this.state = {};
   }

   componentDidMount(){
     getOpenResponses(this.setResponses.bind(this));
     getMURVGenes(this.setGeneratedMurvs.bind(this));
   }

   setResponses(responses){
     let arr1 = [];
     let arr2 = [];
     let arr3 = [];

     for (var i = 0; i < responses.open.length; i++) {
       arr1.push(responses.open[i].response[0]);
       arr2.push(responses.open[i].response[1]);
       arr3.push(responses.open[i].response[2]);
     }

     this.setState({
       responses1: [...arr1],
       responses2: [...arr2],
       responses3: [...arr3],
       sus: [...responses.sus],
       totalVis: responses.totalVis,
       liked: responses.liked,
       avgTime: 356.5,
       minTime: 302.2,
       maxTime: 689.3,
       partCount: responses.partCount
     });
   }

   showResponses(){
     let resp1 = this.state.responses1.map((item, index) => {
       return(
         <p key={ "resp1" + index }>{ item }</p>
       )
     });
     let resp2 = this.state.responses2.map((item, index) => {
       return(
         <p key={ "resp2" + index }>{ item }</p>
       )
     });
     let resp3 = this.state.responses3.map((item, index) => {
       return(
         <p key={ "resp3" + index }>{ item }</p>
       )
     });
     return([...resp1, ...resp2, ...resp3]);
   }
   showSUS(){
     const sum = this.state.sus.reduce((partial_sum, a) => partial_sum + a);
     const avg = sum / this.state.sus.length;
     return(
       <div>
         <p>SUS Avg: { avg }, SUS Count: { this.state.sus.length }</p>
         <p>Total Vis: { this.state.totalVis }, Liked: { this.state.liked }</p>
         <p>Avg Time: { this.state.avgTime }, Min Time: { this.state.minTime }, Max Time { this.state.maxTime }</p>
         <p>User Count: { this.state.partCount }, Vis per user: { this.state.totalVis / this.state.partCount }, Time per vis: { this.state.avgTime / (this.state.totalVis / this.state.partCount) }</p>
       </div>
     )
   }

   generateMURVS(){
     getMURVGenes(this.generateMURVS2);
   }

   setGeneratedMurvs(genes){
     this.setState({
       genes: genes
     })
   }

   generateMURVS(){
     const murvs = this.state.genes.map((item, index) => {
       let newGene = {};
       for (var i = 0; i < Object.keys(item).length; i++) {
         if(Object.keys(item)[i] !== "config" && Object.keys(item)[i] !== "actions" && Object.keys(item)[i] !== "liked"){
         console.log(Object.keys(item)[i])
         if(typeof Object.keys(item)[i] === "string")
          newGene[Object.keys(item)[i]] = MurvGene[Object.keys(item)[i]][Object.values(item)[i]]
        }
       }
       let gene = new MurvGene(item);
       let config;
       switch (item.config) {
         case "Dataset_2":
           config = Config1;
           break;
         case "Dataset_3":
           config = Config2;
           break;
         default:
           config = Config
       }
       config.data.dataset.object.size.width = 200;
       config.data.dataset.object.size.height = 200;
       config.data.dataset.object.size.padding = 20;
       return(
           <MURV gene={ newGene } key={ "murv" + index } config={ config } />
       )
     });
     console.log(murvs);
     return murvs;
   }

   render(){
      console.log(this.state);
       return(
         (this.state.responses1 && this.state.responses2 && this.state.responses3 && this.state.genes)?
         <div className="results">
          { this.showResponses() }
          { this.showSUS() }
          { this.generateMURVS() }
         </div>
         :
         <p>Getting Results...</p>
       )
     }
 }

 export default Results;
