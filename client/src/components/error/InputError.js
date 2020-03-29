import React from 'react'

function InputError(props) {
    let x = []
    for (let err in props.errors) {
        x.push(props.errors[err])
    }
    return (
        <div className="errorContainer">
            {x.map(err => <p className="errorText">{err}</p>)}
        </div>
    )
}



export default InputError;