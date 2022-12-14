import Head from "next/head";
import { Router, useRouter } from "next/router"
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from '@/styles/Event.module.css';
import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({evt}) {
    const router = useRouter();
    // console.log(evt);
    let finalImage;
    if(evt.attributes.image.data){
      finalImage = evt.attributes.image.data.attributes.formats.medium.url;
    }
    const deleteEvent = async(e) => {
      if(confirm('Are you shure?')){
        const res = await fetch(`${API_URL}/api/events/${evt.id}`,{
          method:'DELETE'
        })

        const data = await res.json();

        if(!res.ok){
          console.log(data.message);
          toast.error('Your Data not Deleted');
        }else{
          router.push('/events');
        }
      }
    }

  return (
    <Layout>
        
        <div className={styles.event}>
            <div className={styles.controls}>
              <Link href={`/events/edit/${evt.id}`}>
                <FaPencilAlt /> Edit Event
              </Link>
              <a href="#" className={styles.delete} onClick={deleteEvent}>
                  <FaTimes /> Delete Events
              </a>
            </div>
            <span>
              {new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}
            </span>
            <h1>{evt.name}</h1>
            <ToastContainer />
            {evt.attributes.image && (
              <div className={styles.image}>
                {finalImage && <Image src={finalImage} width={960} height={600} />}

              </div>
            )}

            <h3>Performers :</h3>
            <p>{evt.attributes.performers}</p>
            <h3>Description :</h3>
              <p>{evt.attributes.description}</p>
              <h3>Venue : {evt.attributes.venue}</h3>
              <p>{evt.attributes.address}</p>
            <Link href="/events" className={styles.back}>
                {'<'} Go Back
            </Link>

        </div>
       
    </Layout>
  )
}
// export async function getServerSideProps({ query: { slug } }){
//   console.log(slug);
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props : {
//       evt : events[0]
//     }
//   }
// }

export async function getStaticPaths(){
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();
  const paths = events.data.map(evt => ({
    params : {slug : evt.attributes.slug}
  }));
  // console.log(paths);
  return {
    paths,
    fallback:true  
  }

} 


export async function getStaticProps({params:{slug}}){

  const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`);
  const events = await  res.json();
  // console.log(events);
  

  return {
    props : {
      evt :events.data[0]
    },
    revalidate : 1
  }
}