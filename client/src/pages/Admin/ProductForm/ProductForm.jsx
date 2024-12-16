import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./ProductForm.css";
import AlertBox from "../../../components/AlertBox/AlertBox";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [expense, setExpense] = useState("");
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState("");

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const upload = () => {
    if (files.length > 4 || files.length < 1) {
      setAlertMessage("Maximum 4 and Minimum 1 Image Allowed");
      setAlertType("error");
      setShowAlert(true);
      return;
    }
    let type = false;
    files.forEach((file) => {
      let name = file.name.split(".");
      console.log(
        "Image Name ",
        file.name,
        " Extension",
        name[name.length - 1]
      );
      if (
        name[name.length - 1] == "jpg" ||
        name[name.length - 1] == "jpeg" ||
        name[name.length - 1] == "png"
      ) {
        console.log("Image has correct extension")
      } else {
        setAlertMessage("Only Images Are Allowed As Input Files");
        setAlertType("error");
        setShowAlert(true);
        type = true;
      }
    });
    if (type) return;

    const images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i].name);
    }
    console.log(images);

    const itemData = {
      productName: productName,
      description: productDescription,
      stock: stock,
      price: price,
      expense: expense,
      category: category,
      images: images,
    };

    const formData = new FormData();

    Object.keys(itemData).forEach((key) => {
      formData.append(key, itemData[key]);
    });

    files.forEach((file) => {
      const fileName = file.name;
      formData.append("files", file, fileName);
    });

    axios
      .post("http://localhost:4001/api/products/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);

        // Clear form fields and files after successful request
        setProductName("");
        setProductDescription("");
        setCategory("");
        setStock("");
        setPrice("");
        setFiles([]);
        setExpense("");

        // Display success alert
        setAlertMessage("New product created succefully");
        setAlertType("success");
        setShowAlert(true);
      })
      .catch((err) => {
        // Handle error
        setAlertMessage("Failed to create product");
        setAlertType("error");
        setShowAlert(true);
        console.error(err);
      });
  };

  return (
    <div className="item11 product-form-container" id="new-section">
      <h2>Add New Product</h2>
      <form className="product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            className="form-control"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="expense">Manufacturing Price:</label>
          <input
            type="number"
            id="expense"
            className="form-control"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div>
                <p>Selected files:</p>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview-${index}`}
                        className="preview-image"
                      />
                      {files.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>

        <button type="button" onClick={upload} className="submit-button">
          Add New Product
        </button>
      </form>
      {showAlert && (
        <AlertBox
          message={alertMessage}
          type={alertType}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductForm;
