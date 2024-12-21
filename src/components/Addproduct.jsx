import React, { useState, useEffect } from "react";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState([]);
  const [option, setOption] = useState(null);
  const [one, setOne] = useState("desc");
  const [formData, setFormData] = useState({
    image: "",
    category: "",
    title: "",
    price: "",
    description: "",
  });

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
    const newPrice = prompt("Enter the new price:");
    if (newPrice) {
      axios
        .put(`http://localhost:3000/products/${id}`, { price: newPrice })
        .then(() => {
          setData(
            data.map((item) =>
              item.id === id ? { ...item, price: newPrice } : item
            )
          );
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAddProduct = () => {
    if (
      formData.image &&
      formData.category &&
      formData.title &&
      formData.price &&
      formData.description
    ) {
      axios
        .post("http://localhost:3000/products", formData)
        .then((res) => {
          setData([...data, res.data]);
          setFormData({
            image: "",
            category: "",
            title: "",
            price: "",
            description: "",
          });
        })
        .catch((err) => console.error(err));
    } else {
      alert("Please fill out all fields!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [option, one]);

  return (
    <div
      style={{
        backgroundColor: "#f5f8fc",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Product List</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
            marginRight: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Low to High
        </button>
        <button
          onClick={() => setOne("desc")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          High to Low
        </button>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
          }}
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
          }}
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "200px",
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "150px",
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            width: "250px",
          }}
        />
        <button
          onClick={handleAddProduct}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Product
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
                border: "1px solid #ddd",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
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
              <h2 style={{ margin: "10px 0", color: "#333" }}>{el.title}</h2>
              <p style={{ color: "#555" }}>{el.description}</p>
              <p style={{ fontWeight: "bold", color: "#007bff" }}>
                Category: {el.category}
              </p>
              <p style={{ fontWeight: "bold", color: "#28a745" }}>
                Price: ${el.price}
              </p>
              <div>
                <button
                  onClick={() => handleEdit(el.id)}
                  style={{
                    padding: "8px 15px",
                    marginRight: "10px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(el.id)}
                  style={{
                    padding: "8px 15px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "red",
                    color: "white",
                    cursor: "pointer",
                  }}
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
