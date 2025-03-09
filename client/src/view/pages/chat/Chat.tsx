import styles from './Chat.module.scss'
import { ChatVM } from './ChatVM';

interface Chat {
  senderName: string,
  receiverName: string,
  jobName: string,
  jobCity: string,
  content: string,
  sentAt: Date,
  isRead: boolean
}

function Chat() {

  const { chats } = ChatVM();

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatsList}>
          {chats && chats.map((chat, index) => (
            <div key={index}>
              <div className={styles.chatTitle}>
                <p>{chat.content}</p>
              </div>
              {/* <h3>{chat.senderName}</h3> */}
            </div>
          ))}
        </div>
        <div className={styles.chat}></div>
      </div>
    </div>
  )
}

export default Chat