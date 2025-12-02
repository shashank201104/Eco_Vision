// Author - Manish Aggarwal

import styles from "./TeamMemberCard.module.css";

const TeamMemberCard = ({ image, name, role, bio }) => {
  return (
    <>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.role}>{role}</p>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.icons}>
            <button className={styles.iconBtn}>🌐</button>
            <button className={styles.iconBtn}>✉️</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMemberCard;