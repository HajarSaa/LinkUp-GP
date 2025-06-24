import { useRef } from 'react';
import UserCard from './UserCard'
import styles from './UserDM.module.css'
import DmChatMessage from '../../Chat/ChatMessage/DmChatMessage';

function DmBody() {
  const body_ref = useRef();
  return (
    <div className={styles.dm_body} ref={body_ref}>
      <UserCard />
      <DmChatMessage containerRef={body_ref} />
    </div>
  );
}

export default DmBody