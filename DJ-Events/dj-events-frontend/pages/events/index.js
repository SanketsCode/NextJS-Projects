import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout"
import Pagination from "@/components/Pagination";
import { API_URL } from "@/config/index";
import Link from "next/link";
const PER_PAGE = 3;


export default function EventPage({events,page,total}) {

  return (
   <Layout>
      <h1>All Events</h1>
      {events.length === 0 && <h3>No Events to Show </h3>}
      {events.map(evt => {
        return (
          <EventItem key={evt.id} evt={evt.attributes} />
        )

      })}
     <Pagination total={total}  page={page} />
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

export async function getServerSideProps({query : {page = 1}}){
  const start = +page === 1 ? 0 : (+page - 1)

  //fetch total count
  const totalRes = await fetch(`${API_URL}/api/events/count`);
  const total = await totalRes.json();
  // console.log(total);

  //fetch event
  const res = await fetch(`${API_URL}/api/events?pagination[page]=${start}&pagination[pageSize]=${PER_PAGE}&populate=*`);
  console.log(start);
  const events = await res.json();
  // console.log(events);

  return {
    props : {events:events.data,page : +page,total}
  }
}
