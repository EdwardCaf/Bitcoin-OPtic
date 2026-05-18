import { NewsletterSection } from "../components/newsletter/NewsletterSection";
import { ConnectSection } from "../components/common/ConnectSection";
import styles from "./NewsletterPage.module.css";

export default function NewsletterPage() {
  return (
    <div className={styles.container}>
      <NewsletterSection standalone />
      <ConnectSection delay={0.15} />
    </div>
  );
}
