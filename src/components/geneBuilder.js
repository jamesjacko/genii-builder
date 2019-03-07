import React, { Component } from 'react';
import Gene from './gene.js'

class GeneBuilder extends Component{

  state = {
    genes: []
  }

  componentDidMount(){
    let lsGenes = window.localStorage.getItem("genes");
    if(lsGenes){
      this.setState({
        genes: JSON.parse(lsGenes)
      })
    }
  }

  onDrop(event){
    event.persist();
    let t = (event.target.localName === "ul")? event.target.parentElement: event.parentElement.parentElement;
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

  componentDidUpdate(){
    window.localStorage.setItem("genes", JSON.stringify(this.state.genes));
  }

  onDragOver(event){
    event.stopPropagation();
    event.preventDefault();
  }

  renderGenes(){
    console.log(this.state);
    return(
      this.state.genes.map((el, i) => (
          <div key={ "gene"+i } data-index={ i } onDrop={ (e) => this.onDrop(e) } onDragOver={ (e) => this.onDragOver(e) }>
            <Gene { ...el }/>
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
    return(
      <div className="panel left geneBuilder">
        <h2 onClick={ (e) => this.addGene(e) }>Genes</h2>
        { this.renderGenes() }
      </div>
    );
  }
}

export default GeneBuilder;
