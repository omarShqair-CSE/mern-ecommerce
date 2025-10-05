import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllBooks() {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books/getBooks")
      .then((res) => res.json())
      .then((data) => setBookList(data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="mt-10">
      <h3 className="my-6">All Books</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6  ">
        {bookList?.map((book) => (
          <div
            key={book._id}
            className="flex flex-col items-center  p-4 rounded-lg"
          >
            <img
              src={`http://localhost:5000/images/${book.coverImage}`}
              alt={book.title}
              className="h-40 w-32 object-cover mb-2 rounded-lg"
            />
            <h4 className="capitalize text-center">{book?.title}</h4>
            <span className="text-gray-400">{book?.author}</span>
            <strong className="text-[#F86D72]">{book?.price} $</strong>

            <div className="text-sm text-gray-500">Stock: {book.stock}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
