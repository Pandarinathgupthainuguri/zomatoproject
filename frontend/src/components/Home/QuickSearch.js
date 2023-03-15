import React, { Component } from 'react'
import Mealtype from './Mealtype'

export default class QuickSearch extends Component {
  constructor(){
    super();
    this.state={
      mealtypes:[]
  }}

  componentDidMount(){
    fetch('http://localhost:9091/mealtype',{method:'GET'})
    .then(responce=>responce.json())
    .then(data=>this.setState({mealtypes:data.data}))
  }

  render() {
    // console.log(this.state.mealtypes)
    let MealtypeList=this.state.mealtypes.length && this.state.mealtypes.map(item=><Mealtype item={item} key={item.name}/>)
    return (
      <div>
        <div className="quicksearch">
        <p className="quicksearchHeading">
            Quick Searches
        </p>
        <p className="quicksearchSubHeading">
            Discover restaurants by type of meal
        </p>
        <div className="container-fluid">
           
            <div className="row">
            {MealtypeList}
            </div>
        </div>
    </div>
      </div>
    )
  }
}
