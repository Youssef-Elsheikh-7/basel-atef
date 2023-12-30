const API='ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRek9UVXdMQ0p1WVcxbElqb2lNVGN3TVRVMk1qa3dOUzR3TVRJd01qRWlmUS5LWVNVWF9XR1BWdXFZMzFrVURtaDR3aU9yTXdRWGR5SkZkR251d1NSOS0wSjRUSTQxUHpFdkxXLTZiV0pIUFlpd0FQbjQ4UUIzY1hJLXgzQlN5VnBqUQ=='
export  async  function firstStep () {
    let data = {
      "api_key": API
    }
    let request = await fetch('https://accept.paymob.com/api/auth/tokens' ,{
    
    method: 'post',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(data) 
})
    
    let response = await request.json()
    let token = response.token
    secondStep(token)
}

export  async function secondStep (token) {
    let data = {
        "auth_token":  token,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "EGP",
        "items": []
    }
    let request = await fetch(' https://accept.paymob.com/api/ecommerce/orders',{
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    })
    let response = await request.json()
    let id = response.id
    thirdStep(token,id)

}
export  async function thirdStep (token,id){
    let data = {
        
            "auth_token": token,
            "amount_cents": "100", 
            "expiration": 3600, 
            "order_id": id,
            "billing_data": {
              "apartment": "803", 
              "email": "claudette09@exa.com", 
              "floor": "42", 
              "first_name": "Clifford", 
              "street": "Ethan Land", 
              "building": "8028", 
              "phone_number": "+86(8)9135210487", 
              "shipping_method": "PKG", 
              "postal_code": "01898", 
              "city": "Jaskolskiburgh", 
              "country": "CR", 
              "last_name": "Nicolas", 
              "state": "Utah"
            }, 
            "currency": "EGP", 
            "integration_id": 4399785
          
    }
    let request = await fetch(' https://accept.paymob.com/api/acceptance/payment_keys',{
        method: 'post',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    })
  
    let response = await request.json()
    let Ttoken = response.token
     cardPayment(Ttoken)
}


function cardPayment(Ttoken){
    let iframURL =`https://accept.paymob.com/api/acceptance/iframes/806135?payment_token=${Ttoken}`
    location.href = iframURL
}





