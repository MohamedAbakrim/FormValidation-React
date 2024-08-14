import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container bg-secondary my-2 py-4 rounded px-5'>
        <h1>Contact Form</h1>
        <form action="/action_page.php">
          <div class="mb-3 mt-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" placeholder="Enter Name" name="name"/>
          </div>
          <div class="mb-3 mt-3">
            <label for="email" class="form-label">Email address:</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email" name="email"/>
          </div>
          <div className="mb-3">
            <label for="message">Message :</label>
            <textarea class="form-control" rows="5" id="message" name="message"></textarea>
          </div>
          <div class="form-check mb-3">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" name="remember"/> Accept Conditions
            </label>
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
