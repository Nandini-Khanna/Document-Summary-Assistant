import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="contact-card">
      <h2>Contact</h2>
      <p>Give feedback or some issues? Contact:</p>
      <p>
        <strong>Nandini Khanna</strong>
      </p>
      <div className="social-icons">
        <a href="mailto:2k22.csaiml.32633@gmail.com" target="_blank" rel="noreferrer">
          <MdEmail size={24} />
        </a>
        <a href="https://github.com/Nandini-Khanna" target="_blank" rel="noreferrer">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/nandini-khanna-6bb5842a1" target="_blank" rel="noreferrer">
          <FaLinkedin size={24} />
        </a>
      </div>
    </section>
  );
}
