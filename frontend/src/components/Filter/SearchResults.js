import React from 'react'

export default function SearchResults(props) {
    let cuisineList=props.item.Cuisine.length && props.item.Cuisine.map(item=><span key={item.name}>{item.name},</span>)
  return (
    <div className="Item">
    <div>
        <div className="small-item vertical">
            <img className="img" src={props.item.thumb} />
        </div>
        <div className="big-item">
            <div className="rest-name">{props.item.name}</div>
            <div className="rest-location">{props.item.location}</div>
            <div className="rest-address">{props.item.address}</div>
        </div>
    </div>
    <hr />
    <div>
        <div className="margin-left">
            <div className="Bakery">CUISINES : {cuisineList}</div>
            <div className="Bakery">COST FOR TWO : &#8377; {props.item.cost} </div>
        </div>
    </div>
</div>
  )
}
