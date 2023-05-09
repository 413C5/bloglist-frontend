import React from "react";

const LoginForm = ({
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange
}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                <h1>log in to application</h1>
                username:
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div>
                password:
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">
                login
            </button>
        </form>
    )
}

export default LoginForm