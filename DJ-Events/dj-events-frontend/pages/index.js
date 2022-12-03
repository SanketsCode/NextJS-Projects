import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import Link from "next/link";


export default function HomePage({events}) {
  console.log(events[0]);
  return (
   <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to Show </h3>}
      {events.map(evt => {
        return (
          <EventItem key={evt.id} evt={evt.attributes} />
        )

      })}
      {events.length > 0 && (
        <Link href={'/events'} className="btn-secondary" >
        View All Events
        </Link>
      )}
   </Layout>
  )
}

// export async function getServerSideProps(){
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();
//   // console.log(events);

//   return {
//     props : {events},
//   }
// }

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();
  console.log(events.data[0]);

  return {
    props : {events : events.data},
    revalidate: 1
  }
}
