import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

const ProductPage = () => {
	const [product, setProduct] = useState({});
	const { id } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const res = await fetch(`https://dummyjson.com/products/${id}`);
			const data = await res.json();
			setProduct(data);
			console.log(data);
		};
		fetchProduct();
	}, [id]);
	return (
		<div className="App">
			<h1>Product Title: {product.title}</h1>
			<img src={product.thumbnail} alt={product.title} />
			<h2>Product Brand: {product.brand}</h2>
			<h2>Product Category: {product.category}</h2>
			<h2>Product Price $: {product.price}</h2>
			<h3>Product Description: {product.description}</h3>
			<h3>Product Stock: {product.stock}</h3>
			<h3>Product Rating: {product.rating}</h3>
			{product?.images?.map((img) => (
				<img src={img} key={id} width={200} alt={product.brand} />
			))}
		</div>
	);
};

export default ProductPage;
