import Image from "next/image";
import Form from 'next/form';
import styles from "./page.module.css";
import SSRBlock from "./_components/SSRBlock";
import { MyLottieComponent } from "./_components/MyLottieLogo";
import Home_login  from "./components/home";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div>Test</div>
        <MyLottieComponent/>
        <Home_login/>

        <Form>
          <input name='query' />
          <button type="submit">Submit</button>
        </Form>

        {/* Server Component fetching per request */}
        {/* @ts-expect-error Async Server Component */}
        <SSRBlock/>
      </main>
    </div>
  );
}
