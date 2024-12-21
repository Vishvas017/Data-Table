import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(null);
  const [one, setOne] = useState("desc");

  console.log(one);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/products", {
        params: {
          category: option,
          _sort: "price",
          _order: one,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter the new name:");
    if (newName) {
      axios
        .put(`http://localhost:3000/products/${id}`, { price: newName })
        .then(() => {
          setData(
            data.map((item) =>
              item.id === id ? { ...item, price: newName } : item
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, [option, one]);

  return (
    <div
      style={{
        backgroundColor: "#e6eeff",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Product</h1>
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <select
          onChange={(e) => setOption(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "5px",
            marginRight: "10px",
            border: "1px solid #ccc",
          }}
        >
          <option> ---- SELECT category ----</option>
          <option>electronics</option>
          <option>jewelery</option>
          <option>women's clothing</option>
          <option>men's clothing</option>
        </select>

        <button
          onClick={() => setOne("asc")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            marginRight: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Low to High
        </button>
        <button
          onClick={() => setOne("desc")}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          High to Low
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {data.length > 0 ? (
          data.map((el) => (
            <div
              key={el.id}
              style={{
                border: "2px solid black",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={el.image}
                alt={el.name}
                style={{
                  height: "200px",
                  width: "200px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <h2 style={{ fontSize: "20px", color: "#555", margin: "10px 0" }}>
                {el.name}
              </h2>
              <p style={{ fontSize: "16px", color: "#777" }}>{el.description}</p>
              <p style={{ fontWeight: "bold", color: "#333" }}>Price: ${el.price}</p>
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    marginRight: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEdit(el.id)}
                >
                  Edit
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(el.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#555" }}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Product;
