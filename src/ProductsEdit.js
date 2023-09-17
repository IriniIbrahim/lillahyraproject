import React, { useEffect, useState } from 'react';
import { db } from "./config/firebase"
import { getDocs, collection } from 'firebase/firestore'
import './Products.css'; // Import your CSS file

function ProductsEdit() {
	const [productList, setProductList] = useState([]);
	const [CategoriesList, setcategoriesList] = useState([]);
	const [StatusList, setstatusList] = useState([]);

	const productsCollectionRef = collection(db, "Products");
	const categoriesCollectionRef = collection(db, "Categories");
	const statusCollectionRef = collection(db, "Status");

	const getProductsList = async () => {
		try {
			const productdata = await getDocs(productsCollectionRef);
			const Categoriesdata = await getDocs(categoriesCollectionRef);
			const Statusdata = await getDocs(statusCollectionRef);

			const filteredproductData = productdata.docs.map((doc) => ({
				...doc.data(),
				id: doc.id
			}));
			const filteredcategoriesData = Categoriesdata.docs.map((doc) => ({
				...doc.data(),
				id: doc.id
			}));
			const filteredstatusData = Statusdata.docs.map((doc) => ({
				...doc.data(),
				id: doc.id
			}));
			setProductList(filteredproductData);
			setcategoriesList(filteredcategoriesData);
			setstatusList(filteredstatusData);
		} catch (err) {
			console.error("Error fetching products:", err);
		}
	};

	useEffect(() => {
		getProductsList();
	}, []);

	return (
		<div className="Products"> {/* Apply the 'Products' class to the main container */}
			{productList.map((product) => {
				const category = CategoriesList.find((category) => category.id === product.CategoryID);
				const status = StatusList.find((status) => status.id === product.StatusID);

				return (
					<div className="product-item" key={product.id}> {/* Apply the 'product-item' class */}
						<h1>Product: {product.ProductName}</h1>
						<img src={product.ImgURL} alt={product.ProductName} />
						<p>Price per day: {product.PricePerDay}</p>
						{category && <h4>Category: {category.CategoryName}</h4>}
						{status && <h4>Status: {status.StatusName}</h4>}
					</div>
				);
			})}
		</div>
	);
}

export default ProductsEdit;
