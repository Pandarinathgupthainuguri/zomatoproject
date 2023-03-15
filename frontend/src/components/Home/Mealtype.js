import React from 'react'

export default function MealType(props) {
    // console.log(props.item)
  return (
    <div className="col-sm-12 col-md-6 col-lg-4">
                    <div className="tileContainer">
                        <div className="tileComponent1">
                            <img src={`/${props.item.image}`} height="150" width="140" />
                        </div>
                        <div className="tileComponent2">
                            <div className="componentHeading">
                                {props.item.name}
                            </div>
                            <div className="componentSubHeading">
                                {props.item.content}
                            </div>
                        </div>
                    </div>
                </div>
  )
}
