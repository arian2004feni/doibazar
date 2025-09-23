import React from 'react';
import SingleProduct from './SingleProduct';

const Products = () => {
  const items = [
  {
    "_id": "1",
    "image": "/item1.png",
    "category": "",
    "inStock": true,
    "title": "মিষ্টি দই (ক্লে পট)",
    "price": "১৮০",
    "weight": "500g",
    "cal": "150 kcal"
  },
  {
    "_id": "2",
    "image": "/item2.png",
    "category": "",
    "inStock": true,
    "title": "চকলেট ফাজ কেক",
    "price": "৭৫০",
    "weight": "1kg",
    "cal": "150 kcal"
  },
  {
    "_id": "3",
    "image": "/item3.png",
    "category": "",
    "inStock": false,
    "title": "রসগোল্লা (১২ পিস)",
    "price": "৩০০",
    "weight": "12 pcs",
    "cal": "150 kcal"
  },
  {
    "_id": "4",
    "image": "/item4.png",
    "category": "",
    "inStock": false,
    "title": "ফ্রুট টার্ট",
    "price": "১৫০",
    "weight": "250g",
    "cal": "150 kcal"
  },
  {
    "_id": "5",
    "image": "/item5.png",
    "category": "",
    "inStock": false,
    "title": "বাটার কুকিজ",
    "price": "২২০",
    "weight": "400g",
    "cal": "150 kcal"
  },
  {
    "_id": "6",
    "image": "/item6.png",
    "category": "",
    "inStock": true,
    "title": "ম্যাংগো চিজকেক",
    "price": "৫৫০",
    "weight": "500g",
    "cal": "150 kcal"
  }
];
  return (
    <section className='max-w-7xl mx-auto py-12 px-6'>
      <h2 className="text-3xl font-bold text-center my-8">Our Products</h2>
      <div className="grid min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {items.map(item => <SingleProduct item={item}/>)}
      </div>
    </section>
  );
};

export default Products;