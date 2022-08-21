import React from 'react';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />
    

    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);



// This is how we fetch data in next.js
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';   // fetch all the products
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]'; // fetch all the banner 
  const bannerData = await client.fetch(bannerQuery);

  // whatever getServerSideProps return gets rendered in the app
  return {
    props: { products, bannerData }
  }
}

export default Home;
