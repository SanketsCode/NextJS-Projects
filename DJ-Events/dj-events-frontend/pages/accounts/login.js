import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useContext, useEffect, useState } from 'react';
import styles from '@/styles/AuthForm.module.css';
import { FaUser } from 'react-icons/fa';
import AuthContext from '@/context/AuthContext';



export default function LoginPage() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {login,error} = useContext(AuthContext);

  useEffect(() => {error && toast.error(error)});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password){
      toast.error('email and password required');
      return;
    }
    login({email,password});

  }

  return (
    <Layout title="login">
        <div className={styles.auth}>
          <h1>
            <FaUser /> Log In
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
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
            <input
            type="submit"
            value="Login"
            className="btn"
            />
            <p>
              Don't have an account? <Link href="/accounts/register">
              Register
              </Link>
            </p>
          </form>
        </div>
    </Layout>

  )
}
