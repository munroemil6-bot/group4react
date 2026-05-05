// import React, { useState } from 'react';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic for API calls or authentication goes here
//     console.log("Logging in with:", formData);
//   };

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <h2>Poll App Login</h2>
        
//         <div style={styles.inputGroup}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter your password"
//           />
//         </div>

//         <button type="submit" style={styles.button}>Login</button>
//       </form>
//     </div>
//   );
// };

// // Simple inline styles for quick testing
// const styles = {
//   container: { display: 'flex', justifyContent: 'center', marginTop: '50px' },
//   form: { padding: '20px', border: '1px solid #ccc', borderRadius: '8px', width: '300px' },
//   inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
//   button: { padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }
// };

// export default Login;