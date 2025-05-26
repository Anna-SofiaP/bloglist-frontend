import { useState } from 'react'

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()
        const loginUsername = username
        const loginPassword = password
        setUsername('')
        setPassword('')
        handleLogin(loginUsername, loginPassword)
    }

    return (
        <>
            <form onSubmit={(event) => login(event)}>
                <div className='formTextBox'>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        data-testid='username'
                    />
                </div>
                <div className='formTextBox'>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        data-testid='password'
                    />
                </div>
                <button className='signUpAndLogInButton' type="submit">login</button>
            </form>
        </>
    )
}

export default Login