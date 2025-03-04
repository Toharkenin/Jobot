import styles from './Chat.module.scss'

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

  const chatsList: Chat[] = [];

  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <div className={styles.chatsList}>
          {chatsList.map((chat, index) => (
            <div key={index}>
              <div className={styles.chatTitle}>
                <p>{chat.jobName}</p>
                <p>{chat.jobCity}</p>
              </div>
              <h3>{chat.senderName}</h3>
            </div>
          ))}
        </div>
        <div className={styles.chat}></div>
      </div>
    </div>
  )
}

export default Chat