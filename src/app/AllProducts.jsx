import React from 'react';
import { Link } from 'react-router';

const AllProducts = () => {
  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>All</li>
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;