import '../styles/globals.css'; // Import global CSS styles



function MyApp({ Component, pageProps }) {
  

  return (
    <Layout>
     
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
