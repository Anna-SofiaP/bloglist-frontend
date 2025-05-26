import { useState } from 'react'

const CreateUserForm = ({ createUser }) => {
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newName, setNewName] = useState('')

    const signup = (event) => {
        event.preventDefault()
        const signupUsername = newUsername
        const signupPassword = newPassword
        const signupName = newName
        setNewUsername('')
        setNewPassword('')
        setNewName('')
        createUser(signupUsername, signupName, signupPassword)
    }

    return (
        <div>
            <form onSubmit={(event) => signup(event)}>
                <div className='formTextBox'>
                    username
                    <input
                        type="text"
                        value={newUsername}
                        name="Username"
                        onChange={({ target }) => setNewUsername(target.value)}
                    />
                </div>
                <div className='formTextBox'>
                    name
                    <input
                        type="text"
                        value={newName}
                        name="Name"
                        onChange={({ target }) => setNewName(target.value)}
                    />
                </div>
                <div className='formTextBox'>
                    password
                    <input
                        type="password"
                        value={newPassword}
                        name="Password"
                        onChange={({ target }) => setNewPassword(target.value)}
                    />
                </div>
                <button className='signUpAndLogInButton' type="submit">sign up</button>
            </form>
        </div>
    )
}

export default CreateUserForm