import './recived.style.css'

function Recived(data) {
    
    const msg = data.data

    return(
        <div className="massageRecived">
            <img className="avatar" alt="avatar" src={`${msg.photoURL}`}/>
            {msg.username}
            <br/>
            {msg.text}
        </div>
    )
}

export default Recived