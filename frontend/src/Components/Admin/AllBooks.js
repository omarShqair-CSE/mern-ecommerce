import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllBooks() {
  const [bookList, setBookList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const run = async () => {
      try {
        // const res = await fetch("http://localhost:5000/admin/getBooks", {
        //   method: "GET",
        //   // credentials: "include",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tYXJ0ZXN0QGdtYWlsLmNvbSIsImlkIjoiNjhlMjdhZTEzZDE3MWE4ZjgxYzY0MDcyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU5Njk3MzM0LCJleHAiOjE3NjAzMDIxMzR9.2Me2XG9NZLHc1jUsmYjYxb8x109EMPlhGWn8uxW-e0s"}`, // ضيف هنا الـ JWT
        //   },
        // });
        const res = await fetch("http://localhost:5000/admin/getBooks", {
          method: "GET",
          credentials: "include", // ! important for cookies
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 401 || res.status === 403) {
          navigate("/", { replace: true });
          return;
        }
        const data = await res.json();
        setBookList(data);
      } catch (error) {
        console.log("error fetching books", error);
        navigate("/", { replace: true });
      }
    };
    run();
  }, [navigate]);

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
