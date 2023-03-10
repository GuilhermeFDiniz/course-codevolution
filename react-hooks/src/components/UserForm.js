import React, { useState } from 'react'
import useInput from '../hooks/useInput'

function UserForm() {
  const [firstName, bindFirstName, resetFirstName] = useInput('')
  const [lastName, bindLasttName, resetLasttName] = useInput('')

  const submitHandler = (e) => {
    e.preventDefault()
    alert(`Hello ${firstName} ${lastName}`)
    resetFirstName()
    resetLasttName()
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label>First Name</label>
          <input {... bindFirstName} type="text"></input>
        </div>
        <div>
          <label>Last Name</label>
          <input {... bindLasttName} type="text"></input>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default UserForm
