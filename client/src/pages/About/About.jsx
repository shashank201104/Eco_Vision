// Author - Manish Aggarwal
import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";
const team = [
  {
    name: "Pratham Khare",
    role: "Frontend",
    bio: "Passionate frontend developer focused on building clean, modern and accessible user interfaces with React and modern web technologies.",
    image: "/assets/TeamMembers/pratham.png",
  },
  {
    name: "Shashank",
    role: "Backend",
    bio: "Backend specialist with experience in Node.js, Express, and scalable API design. Strong focus on system architecture and performance.",
    image: "/assets/TeamMembers/shashank.png",
  },
  {
    name: "Shivansh Gupta",
    role: "ML & Backend Developer",
    bio: "Machine Learning and backend developer working on AI models, automation pipelines, and server-side engineering.",
    image: "/assets/TeamMembers/shivansh.png",
  },
  {
    name: "Ansh Mishra",
    role: "Figma & Frontend",
    bio: "UI/UX designer and frontend developer skilled in Figma, prototyping, and building pixel-perfect interfaces using modern design principles.",
    image: "/assets/TeamMembers/ansh.png",
  },
  {
    name: "Manish Aggarwal",
    role: "Frontend",
    bio: "Frontend engineer who loves crafting smooth user experiences. Skilled in React, UI design systems, and responsive layouts.",
    image: "/assets/TeamMembers/manish.png",
  },
];

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backLink}>
        <Link to="/" className={styles.backButton}>
          ← Back to Home
        </Link>
      </div>

      <section className={styles.hero}>
        <h1 className={styles.heading}>Meet Our Team</h1>
        <p className={styles.subheading}>
          We're a passionate group of environmental advocates, engineers, and
          designers united by a common goal: making sustainable living
          accessible through technology.
        </p>
      </section>

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

      <section className={styles.TeamMembers}>
        <div className={styles.grid}>
          {team.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </section>

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
