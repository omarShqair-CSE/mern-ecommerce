import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then((res) => res.json())
      .then((data) => setBookList(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const featuredBooks = bookList?.filter((book) => book.isFeatured === true);

  return (
    <div className="mt-10">
      <h3 className="my-6">Featured Products</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  ">
        {featuredBooks?.slice(0, 4).map((book) => (
          <div
            key={book._id}
            className="flex flex-col items-center  p-4 rounded-lg"
          >
            <span className="text-gray-400">{book?.author}</span>
            <strong className="text-[#F86D72]">{book?.price} $</strong>

            <div className="text-sm text-gray-500">Stock: {book.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;
