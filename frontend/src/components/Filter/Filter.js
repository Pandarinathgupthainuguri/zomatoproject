import React,{useEffect,useState} from 'react'
import '../Style/Filter.css'
import SearchResults from './SearchResults'
import { useParams } from 'react-router-dom';

export default function Filter() {
const [restaurants,setRestaurants]=useState([])
const[filter,setFilter]=useState({
    cuisine:[],
    sort:1,
    lcost:'',
    hcost:'',
    city_id:''
})
const [currentPage,setCurrentpage]=useState(1)

useEffect(()=>{
    fetch(`http://localhost:9091/restaurants/filter/${currentPage}`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(filter)
        })
    .then(response=>response.json())
    .then(data=>setRestaurants(data.data))
            },[filter,currentPage])

    const handleCuisineChange=(e)=>{
        console.log(e.target)
        if(e.target.checked){
            filter.cuisine.push(e.target.value)
        }
        
        else{
            let index=filter.cuisine.indexOf(e.target.value);
            if(index >-1)
            filter.cuisine.splice(index,1)
        }
        setFilter({...filter})
    }
    const locationChange=(e)=>{
        filter.city_id=e.target.value;
        setFilter({...filter});
    }

    const handleCost=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setFilter({...filter})
    }
    
    const handleSort=(sort)=>{
        filter.sort=sort;
        setFilter({...filter})
    }

    let searchResults=restaurants.length && restaurants.map(item=><SearchResults key={item.name} item={item}></SearchResults>)

  return (
    
    <div>
    <div className="heading">Breakfast Places in Mumbai</div>
    <div style={{"padding-left": "15px"}}>  
        <div className="small">
            <div className="filter-options">
                <div className="filter-heading">Filters</div>
                <div className="Select-Location">Select Location</div> 
                <select className="Rectangle-2236" onChange={(e)=>locationChange(e)}>
                <option selected disabled>Select</option>
                          <option value='1'>Delhi</option>
                          <option value='2'>Mumbai</option>
                          <option value='3'>Pune</option>
                          <option value='4'>Banglore</option>
                          <option value='5'>Chandigarh</option>
                </select>
                <div className="Cuisine">Cuisine</div>
                <div>
                    <input type="checkbox" value="North Indian" onChange={(e)=>handleCuisineChange(e)}/>
                    <span className="checkbox-items">North Indian</span>
                </div>
                <div>
                    <input type="checkbox" value="South Indian" onChange={(e)=>handleCuisineChange(e)}/>
                    <span className="checkbox-items">South Indian</span>
                </div>
                <div>
                    <input type="checkbox" value="Chineese" onChange={(e)=>handleCuisineChange(e)}/>
                    <span className="checkbox-items">Chineese</span>
                </div>
                <div>
                    <input type="checkbox" value="Fast Food" onChange={(e)=>handleCuisineChange(e)}/>
                    <span className="checkbox-items">Fast Food</span>
                </div>
                <div>
                    <input type="checkbox" value="Street Food" onChange={(e)=>handleCuisineChange(e)}/>
                    <span className="checkbox-items">Street Food</span>
                </div>
                <div className="Cuisine">Cost For Two</div>
                <div>
                    <input type="radio" name='cost' onChange={()=>handleCost(0,500)}/>
                    <span className="checkbox-items">Less than &#8377; 500</span>
                </div>
                <div>
                    <input type="radio" name='cost' onChange={()=>handleCost(500,1000)}/>
                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                </div>
                <div>
                    <input type="radio" name='cost' onChange={()=>handleCost(1000,1500)}/>
                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                </div>
                <div>
                    <input type="radio" name='cost' onChange={()=>handleCost(1500,2000)}/>
                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                </div>
                <div>
                    <input type="radio" name='cost' onChange={()=>handleCost(2000,10000)}/>
                    <span className="checkbox-items">&#8377; 2000 +</span>
                </div>
                <div className="Cuisine">Sort</div>
                <div>
                    <input type="radio" name="sort"  checked={filter.sort==1} onChange={()=>handleSort(1)}/>
                    <span className="checkbox-items">Price low to high</span>
                </div>
                <div>
                    <input type="radio" name="sort"  checked={filter.sort==-1} onChange={()=>handleSort(-1)}/>
                    <span className="checkbox-items">Price high to low</span>
                </div>
            </div>
        </div>
        <div className="big vertical">
            {searchResults}
          
            <div className="pagination">
                <a href="#">&laquo;</a>
                <a href="#" onClick={()=>setCurrentpage(1)}>1</a>
                <a href="#" onClick={()=>setCurrentpage(2)}>2</a>
                <a href="#" onClick={()=>setCurrentpage(3)}>3</a>
                <a href="#" onClick={()=>setCurrentpage(4)}>4</a>
                <a href="#" onClick={()=>setCurrentpage(5)}>5</a>
                <a href="#" onClick={()=>setCurrentpage(6)}>6</a>
                <a href="#">&raquo;</a>
            </div>
        </div>
    </div>
</div>
  )
}
