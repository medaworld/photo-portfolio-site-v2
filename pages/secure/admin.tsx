import { useState } from 'react';
import { useRouter } from 'next/router';
// import 'firebase/auth';
// import { auth } from '../../lib/firebase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await auth().signInWithEmailAndPassword(email, password);
  //     // Redirect to the admin dashboard or desired page
  //     router.push('/admin/dashboard');
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <h1>Hi</h1>
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //   />
    //   <input
    //     type="password"
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //   />
    //   <button type="submit">Login</button>
    //   {error && <p>{error}</p>}
    // </form>
  );
}
