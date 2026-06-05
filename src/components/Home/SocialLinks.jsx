import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn, FaFacebook } from "react-icons/fa";

const links = [
  { href: "https://github.com/kavindu-w", Icon: AiFillGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/kavindu-warnakulasuriya", Icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "https://x.com/kavindu_warna", Icon: AiOutlineTwitter, label: "Twitter / X" },
  { href: "https://www.facebook.com/kavindu.warnakulasuriya.9", Icon: FaFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/kavindu_warnakulasuriya_/", Icon: AiFillInstagram, label: "Instagram" },
];

function SocialLinks() {
  return (
    <div className="home-about-social">
      <h1>
        <span className="purple">Connect with me</span> 🤝
      </h1>
      <ul className="home-about-social-links">
        {links.map(({ href, Icon, label }) => (
          <li key={label} className="social-icons">
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="icon-colour home-social-icons"
              aria-label={label}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialLinks;
