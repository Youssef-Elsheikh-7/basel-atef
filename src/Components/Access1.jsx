import React from 'react'
import left from "../images/vr.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Access1() {
  return (
    <>
  

    <div className="container ">
   <div className=" bg-main-light">
   <div className="row  py-2 border-bottom  my-2" >
    <div className="col-md-4">
      <img src={left} alt="" className='w-100 border border-2'/>
    </div>
    <div className="col-md-8">
    <h3 className='fw-bolder'>ماك بوك برو</h3>
    <div className="d-flex border-bottom  py-3"> 
    <i className="fa-solid fa-star   text-secondary"></i>
    <i className="fa-solid fa-star   text-warning"></i>
    <i className="fa-solid fa-star   text-warning"></i>
    <i className="fa-solid fa-star   text-warning"></i>
    <i className="fa-solid fa-star text-warning mx-1 " ></i>
    <h6 className='text-secondary mx-2'>reviews 0</h6>
    <h6 className='text-warning mx-2'>التقييم</h6>
   </div>
   <div className='d-flex  py-2'>
   <h4 className='text-secondary mx-2'> 599$</h4>
      <h4>449$</h4>
    </div>
    <p>هو Ipsum Lorem لو ريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان
النص الوهمي القياهو Ipsum Lorem لو ريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد. كان
النص الوهمي القيا</p>

   <button type="button" className="btn   text-warning bg-light "><i className="fa-solid fa-cart-shopping">اضافة الي عربة</i></button>
  <button type="button" className="btn  bg-light mx-3 "><i className="fa-solid fa-heart text-warning"></i></button>
    </div>
    
   
  
     
    </div>
   
     
   </div>
   </div>





















  






    </>
  )
}
