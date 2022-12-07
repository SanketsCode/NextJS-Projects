import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { FaUser } from 'react-icons/fa';



export default function RegisterPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [username,setUsername] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!username || !password || !confirmPassword || !email){
      toast.error("Need to fill all fields");
      return;
    }

    if(password != confirmPassword){
      toast.error('Password not match');
      return;
    }

    

  }



  return (
    <Layout title="login">
        <div className={styles.auth}>
          <h1>
            <FaUser /> Register
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>
                  Username
              </label>
              <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label htmlFor='email'>
                  Email Address
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor='password'>
                Password
              </label>
              <input 
              type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirm_password'>
                Confirm Password
              </label>
              <input 
              type="password"
                id="confirm_password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>
            <input
            type="submit"
            value="Register"
            className="btn"
            />
            <p>
              Already have an account? <Link href="/account/login">
              Login
              </Link>
            </p>
          </form>
        </div>
    </Layout>

  )
}
