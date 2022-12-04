import Layout from "@/components/Layout";
import React, { useState } from "react";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEventPage() {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
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

    const check = JSON.stringify(values);
    console.log(check);
    const res = await fetch(`${API_URL}/api/events`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({data:values})
    })

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
      <h1>Add Event</h1>
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
              value={values.date}
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
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
