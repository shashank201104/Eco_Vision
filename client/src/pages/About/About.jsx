// Author - Manish Aggarwal
import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";

// Team members data
const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Environmental engineer with 10+ years of experience in sustainability. Passionate about leveraging technology to solve climate challenges and create a greener future for all.",
    image: "/assets/TeamMembers/ecoVisionLogo.png",
  },
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Environmental engineer with 10+ years of experience in sustainability. Passionate about leveraging technology to solve climate challenges and create a greener future for all.",
    image: "/assets/TeamMembers/ecoVisionLogo.png",
  },
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Environmental engineer with 10+ years of experience in sustainability. Passionate about leveraging technology to solve climate challenges and create a greener future for all.",
    image: "/assets/TeamMembers/ecoVisionLogo.png",
  },
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Environmental engineer with 10+ years of experience in sustainability. Passionate about leveraging technology to solve climate challenges and create a greener future for all.",
    image: "/assets/TeamMembers/ecoVisionLogo.png",
  },
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Environmental engineer with 10+ years of experience in sustainability. Passionate about leveraging technology to solve climate challenges and create a greener future for all.",
    image: "/assets/TeamMembers/ecoVisionLogo.png",
  },
];

const About = () => {
  return (
    // Main container
    <div className={styles.container}>
    
      {/* Back navigation */}
      <div className={styles.backLink}>
        <Link to="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>

      {/* Hero section */}
      <section className={styles.hero}>
        <h1 className={styles.heading}>Meet Our Team</h1>
        <p className={styles.subheading}>
          We're a passionate group of environmental advocates, engineers, and
          designers united by a common goal: making sustainable living
          accessible through technology.
        </p>
      </section>

      {/* Mission section */}
      <section className={styles.missionSection}>
        <h2 className={styles.missionHeading}>Our Mission</h2>
        <p className={styles.missionText}>
          At EcoVision, we believe that small actions can create big changes.
          Our AI-powered platform empowers individuals and communities to make
          informed recycling decisions, track their environmental impact, and
          contribute to a sustainable future. Together, we're building a world
          where technology and environmental consciousness work hand in hand.
        </p>
      </section>

      {/* Team member cards */}
      <section className={styles.TeamMembers}>
        <div className={styles.grid}>
          {team.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </section>

      {/* Values section */}
      <section className={styles.valuesSection}>
        <h2>Our Values</h2>

        <div className={styles.cards}>
          <div className={styles.card}>
            <img src="/assets/values/ecoVisionLogo.png" />
            <h3>Sustainability</h3>
            <p>
              Every decision we make considers its environmental impact and
              long-term sustainability.
            </p>
          </div>

          <div className={styles.card}>
            <img src="/assets/values/ecoVisionLogo.png" />
            <h3>Community</h3>
            <p>
              We believe in the power of collective action and building
              inclusive environmental solutions
            </p>
          </div>

          <div className={styles.card}>
            <img src="/assets/values/ecoVisionLogo.png" />
            <h3>Innovation</h3>
            <p>
              We continuously push the boundaries of technology to create better
              environmental solutions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
