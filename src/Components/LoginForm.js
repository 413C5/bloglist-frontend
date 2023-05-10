import React, { useState } from "react";

const LoginForm = ({ loginHelper }) => {
    const [username, setUsername] = useState('') //Credentials
    const [password, setPassword] = useState('')


    //handleLogin
    const loginUser = (event) => {
        event.preventDefault()

        loginHelper({
            username: username,
            password: password
        })

        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={loginUser}>
            <div>
                <h1>log in to application</h1>
                username:
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">
                login
            </button>
        </form>
    )
}

export default LoginForm