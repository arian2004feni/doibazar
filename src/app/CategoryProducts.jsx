import React from 'react';
import { Link, useParams } from 'react-router';

const CategoryProducts = () => {
  const {category} = useParams();
  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>{category}</li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryProducts;