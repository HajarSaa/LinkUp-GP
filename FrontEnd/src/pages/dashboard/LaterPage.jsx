import styles from './dashboard.module.css'
import avatar from "/assets/laterImage.svg";

import PageContent from "../../components/Layout/PageContent/PageContnet";

function LaterPage() {
  return (
    <PageContent>
      <div className={styles.page_content}>
        <div className={styles.later_page}>
          <img src={avatar} alt="" />
        </div>
      </div>
    </PageContent>
  );
}

export default LaterPage;
