import React,{useState,useEffect} from 'react'
import Header from '../common/Header'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useParams } from 'react-router-dom';
import '../Style/RestaurantDetails.css'
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'50%',
    height:'90%',
    color: '#192f60',
    overflow: 'scroll'
  },
};

Modal.setAppElement('#root');

export default function RestaurantDetails() {
//Hook 
let{rName}=useParams()

const[isMenuModalOpen,setMenuModal]=useState(false)


const [restaurant,setRestaurant]=useState({})
const [menu,setMenu]=useState([])
const [totalPrice,setTotalPrice]=useState(0)
const [count,setCount]=useState(0);


let loadScript = async () => {
  const script = document.createElement('script')
  script.src = "https://checkout.razorpay.com/v1/checkout.js"
  document.body.appendChild(script);
  return true;  
};
//.........
let makePayment =async ()=>{
let isLoaded = await loadScript()
if(!isLoaded){
  alert("Failed to Load SDK")
  return false;
};
{/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}

let response = await fetch('http://localhost:9091/restaurants/get-order-id', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({amount: totalPrice})
})

let {order,status} = await response.json();
if(status === false){
  alert('Unable to create id, try again')
  return false;
}

var options = {
    "key": "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
    "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": order.currency,
    "name": "Zomato clone",
    "description": "Enjoy your day with this order",
    "image": "https://brandlogovector.com/wp-content/uploads/2021/02/Zomato-Logo.png",
    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "Akshay More",
        "email": "moreakshay7056@gmail.com",
        "contact": "9923140857"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
try{
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
}catch(error){
  alert('Something went wrong......... Try again')
} 
};
// .........

useEffect(()=>{
  fetch(`http://localhost:9091/restaurants/details/${rName}`)
  .then(Response=>Response.json())
  .then(data=>setRestaurant(data.data))
},[]) 

const getMenu=()=>{
  fetch(`http://localhost:9091/menu/${rName}`,{method:'GET'})
  .then(response=>response.json())
  .then((data)=>{
    data.data=data.data.map((value)=>{return{...value,qty:0}})
    setMenu(data.data)
  })

}

  const calPrice=(price)=>{
    let price1 = totalPrice+price;
    setTotalPrice(price1)
  }

  let CusineList=!(restaurant.Cuisine===undefined)&& (restaurant.Cuisine.length && <ul>
    {restaurant.Cuisine.map((item,index)=>(
    <li key={index}>{item.name}</li>
    ))}
    </ul>
  )
  return (
    <div>
      <Header/>
      <div>
        <img src={restaurant.thumb} width='100%' height='300px' />
      </div>
      <div className='heading'>
        <span>{restaurant.name}
        <button type="button" class="btn btn-danger order" style={{fontSize:'bolder'}} onClick={()=>{setMenuModal(true);getMenu()}}>Place online order</button>
        </span>   
      </div><br/>
      <Tabs className='content'>
        <TabList>
          <Tab >Overveiw</Tab>
          <Tab>Contact</Tab>
        </TabList>
        <TabPanel>
          <p>
            About the place<br/>
            Cuisine<br/>
            {CusineList}
            Average price<br/>
            &#8377;{restaurant.cost}
          </p>
          </TabPanel>
          <TabPanel>
            <p>Phone Number<br/>
            +91-9923140857<br/>
            {restaurant.address}
            </p>
        </TabPanel>
      </Tabs>
      <Modal 
          isOpen={isMenuModalOpen}
          style={customStyles}
          >
            <h2>Menu
              <button className="btn btn-danger" style={{float:'right'}} onClick={()=>setMenuModal(false)}>X</button>
            </h2>
            <hr/>
            <h3><span style={{background:'#A6CDFB'}}>Total Price: {totalPrice} </span>
              <button disabled={totalPrice <=0?true:false}
               className="btn btn-success" style={{float:'right'}} onClick={()=> makePayment()} >Pay Now</button>
            </h3>
            <hr/>
            <ul >
              {
                menu.length && menu.map((item,index)=>
                <li key={index}>
                  <div>
                  {item.itemName}
                    {item.isVeg ? <span className='text-success'> <sub>Veg</sub></span>:<sapn className='text-danger'> <sub>Non-Veg</sub></sapn>}
                   <p style={{fontSize:'smaller',color:'gray'}}>{item.itemDescription}</p> 
                   &#8377;{item.itemPrice}&nbsp;<span>
                    <button
                    value={item.itemPrice} onClick={(e)=>{
                      setTotalPrice((totalPrice>=0)&&(totalPrice+Number(e.target.value)));
                      let _menu = [...menu];
                      _menu[index].qty +=1
                      setMenu([...menu])
                    }} className='btn btn-outline-secondary btn-sm'>+
                    </button>
                    &nbsp;
                    {item.qty}
                    &nbsp;
                    {
                      item.qty <=0 ? null:
                      <button
                    value={item.itemPrice} onClick={(e)=>{
                      setTotalPrice((totalPrice>=0)&&(totalPrice-Number(e.target.value)));
                      let _menu = [...menu];
                      _menu[index].qty -=1
                      setMenu([...menu])
                    }} className='btn btn-outline-secondary btn-sm'>-
                    </button>
                    }
                    
                   </span><hr/>
                  </div>
                </li>
                )
              }
            </ul>
            <hr/>
            
          </Modal>
    </div>
  )
}
