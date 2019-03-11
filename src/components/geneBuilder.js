import React, { Component } from 'react';
import Gene from './gene.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class GeneBuilder extends Component{

  state = {
    genes: [{}]
  }

  componentWillMount(){
    let lsGenes = window.localStorage.getItem("genes");
    if(lsGenes){
      this.setState({
        genes: JSON.parse(lsGenes)
      })
    }
  }

  onDrop(event){
    event.persist();
    let t = (event.target.localName === "ul")? event.target.parentElement: event.target.parentElement.parentElement;
    let index = t.getAttribute('data-index');
    if(event.dataTransfer.getData('id')){
      if(JSON.parse(event.dataTransfer.getData('id')).mode === 1){
        let data = JSON.parse(event.dataTransfer.getData('id'));
        if(this.state.genes[index]){
          let arr = [...this.state.genes]
          arr[index][data.prop]=data.item;
          this.setState({
            genes: arr
          })
        } else {
          this.setState({
            genes: this.state.genes.concat({[data.prop]:data.item})
          })
        }
      }
    }
  }

  removeGene(index){
    var arr = [...this.state.genes];
    arr.splice(index, 1);
    this.setState(prevState => ({
      genes: arr
    }));
  }
  copyGene(index){
    let arr = [];
    for (var i = 0; i < this.state.genes.length; i++) {
      if(i === index)
        arr.push({...this.state.genes[i]});
      arr.push(this.state.genes[i])
    }
    this.setState(prevState => ({
      genes: arr
    }));
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }

  renderGenes(){
    return(
      this.state.genes.map((el, i) => (
          <div key={ "gene"+i } data-index={ i } onDrop={ (e) => this.onDrop(e) } onDragOver={ (e) => this.onDragOver(e) }>
            <Gene { ...{
                ...el, actions:
                { remove: this.removeGene.bind(this), copy: this.copyGene.bind(this), index: i }
              }
            }/>
          </div>
        )
      )
    )
  }

  addGene(e){
    e.preventDefault();
    this.setState(prevState => ({
      genes: [...prevState.genes, {}]
    }))
  }

  render(){
    window.localStorage.setItem("genes", JSON.stringify(this.state.genes));
    return(
      <div className="panel left geneBuilder">
        <h2>Genes</h2>
        <p>These are the genes for each visualisation type that you have created. Once a gene is complete you can drag it across to the rendering canvas and you visualisation will be shown. You can change properties of genes and re-render them as you see fit, simply drag them across again to see the new vis.</p>
        { this.renderGenes() }
        <FontAwesomeIcon icon={faPlusCircle} onClick={ (e) => this.addGene(e) } title="Add Gene" />
      </div>
    );
  }
}

export default GeneBuilder;
