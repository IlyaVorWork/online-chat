import react from 'react'
import firebase from 'firebase'
import "firebase/firestore"
import { useCollectionData } from 'react-firebase-hooks/firestore'

import './loggedIn.style.css'
import Recived from '../massage/recived/recived'
import Sended from '../massage/sended/sended'

function LoggedIn(data) {

    const user = data.data

    const db = firebase.firestore()

    const q = db.collection('massages').orderBy('createdAt')

    const [massages, loading] = useCollectionData(q)

    const sendMassage = async () => {
        await db.collection("massages").add({
            text: massage,
            uid: user.uid,
            username: user.displayName,
            photoURL: user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        setMassage('')
        scrollToBottom()
    }

    const messagesEnd =  document.getElementById('messagesEnd')

    react.useEffect(() => {
        const msgEnd = document.getElementById('messagesEnd')
        msgEnd.scrollIntoView({ behavior: "smooth" })
    })

    const scrollToBottom = () => {
        messagesEnd.scrollIntoView({ behavior: "smooth" })
    }

    const [massage, setMassage] = react.useState('')

    return(
        <div className="chat">
            <div className="massages">
                {!loading ? 
                    (
                        massages.map(msg => 
                        {
                            if (msg.uid === user.uid) {
                                return <Recived data={msg}/>
                            }
                            else {
                                return <Sended data={msg} />
                            }
                        })
                    ) 
                    : 
                    (
                        "Загрузка"
                    )
                }
                <div id={'messagesEnd'} />
            </div>
            <div className="sendField">
                <input className="input" value={massage} onChange={(e) => setMassage(e.target.value)} onKeyUp={(e) => e.key === 'Enter' ? sendMassage() : null}></input>
                <button className="sendButton" onClick={sendMassage}>
                    <span className="material-icons sendIcon">
                        send
                    </span>
                </button>
            </div>
        </div>
    )
}

export default LoggedIn