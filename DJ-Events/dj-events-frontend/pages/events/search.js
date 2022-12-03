import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import qs from "qs";

export default function SearchPage({ events }) {
    const router = useRouter();
  //   console.log(events);
  return (
    <Layout title="Search Results">
        <Link href="/event">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events to Show </h3>}
      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt.attributes} />;
      })}
    </Layout>
  );
}

// export async function getServerSideProps(){
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();
//   // console.log(events);

//   return {
//     props : {events},
//   }
// }

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $contains: term,
            },
          },
          {
            performers: {
              $contains: term,
            },
          },
          {
            venue: {
              $contains: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  console.log(query);



  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);
  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
