import React, { Component } from 'react'
import { Link } from 'react-router-dom';
export default class Wallpaper extends Component {

    constructor(){
        super();
        this.state={
            locations:[],
            restaurants:[]
        }
    }
    componentDidMount(){
        fetch('http://localhost:9091/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({locations:data.data}))
    }

    fetchRestaurants=(event)=>{
        // console.log(event.target.value)
        fetch(`http://localhost:9091/restaurants/${event.target.value}`,{method:'GET'})
        .then(response=>response.json())
        .then(data=>this.setState({restaurants:data.data}))
    }
  render() {
    // console.log(this.state.locations)
    let locationList=this.state.locations.length && this.state.locations.map(item=><option key={item.name} value={item.city_id}>{item.name}</option>)

    let restaurantsList=this.state.restaurants.length && <ul>{this.state.restaurants.map(item=><li key={item.name}><Link to={`/details/${item.name}`}>{item.name}</Link></li>)}</ul> 
    return (
        <div>
        <img src={`/assets/homepageimg.png`} width="100%" height="450"/>
        {/* <img src={`/assets/nightlife.png`} width="100%" height="450"/> */}
        <div>
            <div className="logo">
                <span>e!</span>
            </div>
            <div className="headings">
                Find the best restaurants, cafes, bars
            </div>
            <div className="locationSelector">
                <select className="locationDropdown" onChange={this.fetchRestaurants}>
                    <option value="0" >Select</option>
                    {locationList}
                    {/* <option value="1">Sarjapura,Bangalore</option>
                    <option value="1">HSR Layout,Bangalore</option>
                    <option value="1">Kormangala,Bangalore</option>
                    <option value="1">Bannerghata Road,Bangalore</option> */}
                </select>
                <div id="notebook">
                    <input className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" />
                    {restaurantsList}
                    <span className="glyphicon glyphicon-search search"></span>
                </div>
            </div>
        </div>
        </div>
    )
  }
}
