import React from "react";
import '../styles/style.css';

export default function App() {
  let pathname = window.location.pathname;
  pathname = pathname === '/' ? '/home' : pathname;
  const [header, setHeader] = React.useState('');
  React.useEffect(() => {
    window.addEventListener('popstate', event => {
      const prevUrl = event?.state?.pathname === undefined ? pathname : event.state.pathname;
      apiCall(`/api${prevUrl}`);
    });

    apiCall(`/api${pathname}`);
  }, []);

  async function apiCall(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHeader(data.header);
    } catch (err) {
      setHeader(err.message);
    }
  } 

  function getHeader(event) {
    const url = `/${event.target.name}`;
    history.pushState({pathname: url}, '', url === '/home' ? '/' : url);

    apiCall(`/api${url}`);
  }
  
  return (
  <div>
    <ul>
      <li><button onClick={getHeader} name="home">Home</button></li>
      <li><button onClick={getHeader} name="about">About</button></li>
      <li><button onClick={getHeader} name="contact">Contact</button></li>
    </ul>
    <h1>{header}</h1>
  </div>
  );
}
