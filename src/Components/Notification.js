import React from "react";

const Notification = ({ message, state }) => {
    //Nada
    if (message === null && state === false)
        return null

    //Mensaje de error
    else if (message !== null && state === false)
        return (
            <div className="error">
                {message}
            </div>
        )

    //Caso operación exitosa
    else if (message !== null && state === true)
        return (
            <div className="good">
                {message}
            </div>
        )
}


export default Notification