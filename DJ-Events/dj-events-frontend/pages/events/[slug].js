import Head from "next/head";
import { useRouter } from "next/router"
import Layout from "../../components/Layout";


export default function EventPage() {
    const router = useRouter();

  return (
    <Layout>
        <Head>
            <title>DJ Events</title>
            <meta name="description" content="welcome to DJ Events" />
        </Head>
        <h1>My Event</h1>
        <h3>{router.query.slug}</h3>
        <button onClick={() => router.push('/')}>click</button>
    </Layout>
  )
}
