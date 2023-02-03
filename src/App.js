import { useState, useEffect } from "react";
import { Route, Link, Routes } from "react-router-dom";
import "./App.css";
import ProductPage from "./components/ProductPage";

function HomePage() {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const [filterproducts, setFilterProducts] = useState([]);

	const fetchProducts = async () => {
		const res = await fetch("https://dummyjson.com/products");
		const data = await res.json();
		setProducts(data.products);
		setFilterProducts(data.products);
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value);
		setFilterProducts(
			products.filter((product) =>
				product.title.toLowerCase().includes(search.toLowerCase())
			)
		);
	};
	return (
		<>
			<div className="App">
				<input
					type="text"
					style={{
						padding: "15px",
						outline: "none",
						marginTop: "15px",
						borderRadius: "10px",
					}}
					value={search}
					onChange={handleSearch}
					placeholder="Search Products"
				/>
				{filterproducts?.map((product) => (
					<div key={product.id} style={{ padding: "8px" }}>
						<Link
							style={{
								textDecoration: "none",
								color: "white",
								padding: "5px",
								fontSize: "20px",
							}}
							to={`/products/${product.id}`}>
							⚠️ {product.title}
						</Link>
					</div>
				))}
			</div>
		</>
	);
}

const App = () => (
	<Routes>
		<Route exact path="/" element={<HomePage />} />
		<Route exact path="/products/:id" element={<ProductPage />} />
	</Routes>
);

export default App;
