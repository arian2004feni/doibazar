import React from 'react';
import SingleProduct from './SingleProduct';

const Products = () => {
  const items = [
  {
    "_id": "1",
    "image": "/item1.png",
    "category": "দই",
    "inStock": true,
    "title": "মিষ্টি দই (ক্লে পট)",
    "price": 180,
    "weightOrCal": "500g"
  },
  {
    "_id": "2",
    "image": "/item2.png",
    "category": "কেক",
    "inStock": true,
    "title": "চকলেট ফাজ কেক",
    "price": 750,
    "weightOrCal": "1kg"
  },
  {
    "_id": "3",
    "image": "/item3.png",
    "category": "মিষ্টি",
    "inStock": false,
    "title": "রসগোল্লা (১২ পিস)",
    "price": 300,
    "weightOrCal": "12 pcs"
  },
  {
    "_id": "4",
    "image": "/item4.png",
    "category": "পেস্ট্রি",
    "inStock": false,
    "title": "ফ্রুট টার্ট",
    "price": 150,
    "weightOrCal": "250g"
  },
  {
    "_id": "5",
    "image": "/item5.png",
    "category": "কুকিজ",
    "inStock": false,
    "title": "বাটার কুকিজ",
    "price": 220,
    "weightOrCal": "400g"
  },
  {
    "_id": "6",
    "image": "/item6.png",
    "category": "কেক",
    "inStock": true,
    "title": "ম্যাংগো চিজকেক",
    "price": 550,
    "weightOrCal": "500g"
  }
];
  return (
    <section className='max-w-7xl mx-auto py-12 px-6'>
      <h2 className="text-3xl font-bold text-center my-8">Our Products</h2>
      <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {items.map(item => <SingleProduct item={item}/>)}
      </div>
    </section>
  );
};

export default Products;