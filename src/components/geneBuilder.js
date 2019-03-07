import React, { Component } from 'react';
import Gene from './gene.js'

class GeneBuilder extends Component{

  state = {
    genes: []
  }

  renderGenes(){
    return(
      this.state.genes.map((el, i) => (
          <Gene key={ "gene"+i } />
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
