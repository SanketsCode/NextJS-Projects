import Layout from "@/components/Layout";
import React, { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import Image from "next/image";
import { FaImage } from "react-icons/fa";

export default function EditEventPage({evt}) {
    const oldData = evt.data;
    const {name,address,performers,venue,date,time,description,image} = evt.data.attributes;
    // console.log(image);
    const [imagePreview,setImagePreview] = useState(image.data ? image.data.attributes.formats.medium.url : null);
    const [values, setValues] = useState({
    name: name,
    performers: performers,
    venue: venue,
    address: address,
    date: new Date(date),
    time: time,
    description: description
  });


  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation
    const hasEmptyFields = Object.values(values).some((ele) => ele === '');
    if(hasEmptyFields){
      toast.error("Please Fill on All Fields");
      return;
    }

    // const check = JSON.stringify(values);
    // console.log(check);
    // const img = values.image;
    // console.log(JSON.stringify(img));

    console.log(JSON.stringify(values));

    const res = await fetch(`${API_URL}/api/events/${evt.data.id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({data:{...values,...oldData}})
    })
    // console.log(res);

    if(!res.ok){
      console.log(res);
      toast.error('Something Went Wrong')
    }else{
      const evt = await res.json()
      // console.log(evt.data.attributes.slug);
      router.push(`/events/${evt.data.attributes.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };
  return (
    <Layout>
      <Link href="/events">Go back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>
        Event Image
      </h2>
      {imagePreview && (
        <Image src={imagePreview} height={100} width={170} />
      )}
      {
        !imagePreview && <div><p>No Image Uploaded</p></div>
      }
      <div>
        <button className="btn-secondary">
                <FaImage /> Set Image
        </button>
      </div>
    </Layout>
  );
}


export async function getServerSideProps({params:{id}}){
    const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
    const evt = await res.json();
return {
    props:{
        evt
    }
}

}
