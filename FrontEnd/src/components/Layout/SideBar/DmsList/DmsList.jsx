import styles from "./DmsList.module.css";
import DmsListItem from "./DmsListItem";
function DmsList() {
  const users = [
    {
      name: "Alaa Abdulkhaliq",
      id: "1",
    },
    {
      name: "Ahmed AYman",
      id: "2",
    },
  ];
  return (
    <div>
      <div className={styles.list}>
        {users.map((user, index) => (
          <DmsListItem key={index} id={user.id} name={user.name} />
        ))}
      </div>
    </div>
  );
}

export default DmsList;
