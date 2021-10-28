import react from 'react'
import './sended.style.css'

function Sended(data) {
    
    const msg = data.data

    return(
        <div className="massageSended">
            {msg.username}
            <br/>
            {msg.text}
            <img className="avatar" src={`${msg.photoURL}`}/>
        </div>
    )
}

export default Sended