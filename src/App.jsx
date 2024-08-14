import { useEffect, useRef, useState } from 'react'

function App() {

  const name = useRef()
  const email = useRef()
  const message = useRef()
  const acceptConditions = useRef()

  const [isFormSent, setIsFormSent] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false) 

  const [errors, setErrors] = useState({})


  const resetFrom = () => {
    name.current.value = ''
    email.current.value = ''
    message.current.value = ''
    acceptConditions.current.value = ''
  }

  const validateFrom = () => {
    const nameValue = name.current.value
    const emailValue = email.current.value
    const messageValue = message.current.value
    const acceptConditionsValue = acceptConditions.current.checked

    let isFormValid = true

    setErrors([])

    if(nameValue.trim() === ""){
      setErrors(prevState =>{
        return {...prevState, ...{name : 'field required'}}
      }) 
      isFormValid = false
    }

    if(emailValue.trim() === ""){
      setErrors(prevState =>{
        return {...prevState, ...{email : 'field required'}}
      }) 
      isFormValid = false
    }else if(!emailValue.match(/^\S+@\S+\.\S+$/)){
      setErrors(prevState =>{
        return {...prevState, ...{email : 'field not valid'}}
      }) 
      isFormValid = falsee
    }

    if(messageValue.trim() === ""){
      setErrors(prevState =>{
        return {...prevState, ...{message : 'field required'}}
      }) 
      isFormValid = false
    }

    if(!acceptConditionsValue){
      setErrors(prevState =>{
        return {...prevState, ...{acceptConditions : 'plz accept the conditions'}}
      }) 
      isFormValid = false
    }

    setIsFormValid(isFormValid)
    return isFormValid
  }


  const getError = (fieldName) => {
    return errors[fieldName]
  }


  const hasError = (fieldName) => {
    return getError(fieldName) !== undefined
  }


  const displayError = (fieldName) => {
    const field = document.querySelector(`#${fieldName}`)
    if(hasError(fieldName)){
      field.style.border = "1px solid red"
      return <div className='text-danger'>{getError(fieldName)}</div>
    }

    if(field !== null){
      field.removeAttribute('style')
    }
  }


  const displayErrors = () => {
    return Object.entries(errors).map(error => {
      const [field, message] = error
      return <li>{field} : {message}</li>
    })
  }

  const handleChange = () => {
    validateFrom()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsFormSent(false)
    if(validateFrom()){
      setIsFormSent(true)
      resetFrom()
    }
    
  }

  return (
    <>
      <div className='container my-2 py-4 rounded px-5'>
        {
          Object.keys(errors).length ?  
          <div className="my-2 alert alert-danger">
            <strong>Errors</strong>
            <ul>{displayErrors()}</ul>
          </div> 
          : ''
        }
        {isFormSent ? 
          <div className="my-2 alert alert-success">
            <strong>succes</strong> ur form has been sent successfuly
          </div> : ''
        }
        <h1>Contact Form</h1>
        <hr/>
        <form onSubmit={e=>handleSubmit(e)}>
          <div class="mb-3 mt-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Name" name="name" ref={name} onChange={handleChange}/>
            {displayError('name')}
          </div>
          <div class="mb-3 mt-3">
            <label for="email" class="form-label">Email address:</label>
            <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" ref={email} onChange={handleChange}/>
            {displayError('email')}
          </div>
          <div className="mb-3">
            <label for="message">Message :</label>
            <textarea class="form-control" rows="5" id="message" name="message" ref={message} onChange={handleChange}></textarea>
            {displayError('message')}
          </div>
          <div class="form-check mb-3">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" id="acceptConditions" name="acceptConditions" ref={acceptConditions} onChange={handleChange}/> Accept Conditions
              <br/>{displayError('acceptConditions')}
            </label>
          </div>
          <button type="submit" disabled={!isFormValid} class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
