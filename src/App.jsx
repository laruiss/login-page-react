import { useState } from 'react'
import logo from './logo.svg'
import './App.css'


function isValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function isStrongPassword (val) {
  return /[0-9]/.test(val)
    && /[a-z]/.test(val)
    && /[A-Z]/.test(val)
    && /[@!;:-_*]/.test(val)
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  function changeEmail(event) {
    setEmail(event.target.value)
    if (!errors.email) {
      return
    }
    const invalidEmail = !isValidEmail(email)
    // emailInput.classList.toggle('error', invalidEmail)
    setErrors({
      ...errors,
      email: invalidEmail ? 'Votre email ne semble pas valide' : ''
    })
  }

  function changePassword(event) {
    setPassword(event.target.value)
    if (!errors.password) {
      return
    }
    const isWeakPassword = !isStrongPassword(password)
    // emailInput.classList.toggle('error', isWeakPassword)
    setErrors({
      ...errors,
      password: isWeakPassword ? 'Votre mot de passe n’est pas assez fort' : ''
    })
  }

  function checkEmail(event) {
    const invalidEmail = !isValidEmail(event.target.value)
    setErrors({
      ...errors,
      email: invalidEmail ? 'Votre email ne semble pas valide' : ''
    })
  }

  function checkPassword(event) {
    const invalidPassword = !isStrongPassword(event.target.value)
    setErrors({
      ...errors,
      password: invalidPassword ? 'Votre mot de passe n’est pas assez fort' : ''
    })
  }

  function login(event) {
    event.preventDefault()
    fetch('/api/auth/token', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
      })
    }).then(res => res.json())
  }
  

  return (
    <div className="App">
      <form action="/api/token" className="login-form" onSubmit={login}>
        <div className="flex  flex-center  flex-wrap  my-1">
          <label className="w-half label" htmlFor="email">Email :</label>
          <input className="w-half" type="email" value={email} onChange={changeEmail} onBlur={checkEmail} />
          {
            errors.email
              && <p id="email-message" className="w-full">{errors.email}</p>
          }
        </div>
        <div className="flex  flex-center  flex-wrap  my-1">
          <label className="w-half label" htmlFor="password">Mot de passe :</label>
          <input className="w-half" type="password" value={password} onChange={changePassword} onBlur={checkPassword} />
          {
            errors.password
              && <p id="password-message" className="w-full">{errors.password}</p>
          }
        </div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  )
}

export default App
