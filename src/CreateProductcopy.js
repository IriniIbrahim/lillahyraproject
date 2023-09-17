import React, { useState, useEffect } from "react";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import "./CreateProduct.css"; // Import your CSS file

function CreateProduct() {
	const [newProductName, setNewProductName] = useState("");
	const [newPricePerDay, setNewPricePerDay] = useState("");
	const [newImgURL, setNewImgURL] = useState("");
	const [updatedProduct, setUpdatedProduct] = useState("");
	const [fileUpload, setFileUpload] = useState(null);

	const [ProductList, setProductList] = useState([]);
	const [categoriesList, setCategoriesList] = useState([]);
	const [statusList, setStatusList] = useState([]);

	const [productData, setProductData] = useState({
		category: "",
		status: "",
	});

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
				id: doc.id,
			}));
			const filteredcategoriesData = Categoriesdata.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			const filteredstatusData = Statusdata.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProductList(filteredproductData);
			setCategoriesList(filteredcategoriesData);
			setStatusList(filteredstatusData);
		} catch (err) {
			console.error("Error fetching products:", err);
		}
	};

	useEffect(() => {
		getProductsList();
	}, []);

	const onSubmitProduct = async () => {
		try {
			await addDoc(productsCollectionRef, {
				ProductName: newProductName,
				PricePerDay: newPricePerDay,
				StatusID: productData.status,
				userId: auth?.currentUser?.uid,
				ImgURL: newImgURL,
			});
			getProductsList();
		} catch (err) {
			console.error(err);
		}
	};

	const deleteProduct = async (id) => {
		const productDoc = doc(db, "Products", id);
		await deleteDoc(productDoc);
		getProductsList();
	};

	const updateProductName = async (id) => {
		const productDoc = doc(db, "Products", id);
		await updateDoc(productDoc, { ProductName: updatedProduct });
		getProductsList();
	};

	const uploadFile = async () => {
		if (!fileUpload) return;
		const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
		try {
			await uploadBytes(filesFolderRef, fileUpload);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="App">
			<Auth />

			<div className="product-form">
				<input
					placeholder="Product Name..."
					value={newProductName}
					onChange={(e) => setNewProductName(e.target.value)}
				/>
				<input
					placeholder="Price per day..."
					type="number"
					value={newPricePerDay}
					onChange={(e) => setNewPricePerDay(Number(e.target.value))}
				/>
				<input
					placeholder="Image URL..."
					value={newImgURL}
					onChange={(e) => setNewImgURL(e.target.value)}
				/>
				<div>
					<label htmlFor="category">Category</label>
					<select
						id="category"
						name="category"
						value={productData.category}
						onChange={(e) =>
							setProductData({ ...productData, category: e.target.value })
						}
					>
						<option value="">Select a category</option>
						{categoriesList.map((category) => (
							<option key={category.id} value={category.categoryName}>
								{category.categoryName}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="status">Status</label>
					<select
						id="status"
						name="status"
						value={productData.status}
						onChange={(e) =>
							setProductData({ ...productData, status: e.target.value })
						}
					>
						<option value="">Select a status</option>
						{statusList.map((status) => (
							<option key={status.id} value={status.statusName}>
								{status.statusName}
							</option>
						))}
					</select>
				</div>
				<button onClick={onSubmitProduct}>Submit Product</button>
			</div>
			<div className="product-list">
				{ProductList.map((product) => (
					<div key={product.id}>
						<h1>{product.ProductName}</h1>
						<p>Price per day: {product.PricePerDay}</p>
						<button onClick={() => deleteProduct(product.id)}>
							Delete Product
						</button>
						<input
							placeholder="new product..."
							onChange={(e) => setUpdatedProduct(e.target.value)}
						/>
						<button onClick={() => updateProductName(product.id)}>
							Update Product
						</button>
					</div>
				))}
			</div>
			<div className="file-upload">
				<input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
				<button onClick={uploadFile}>Upload File</button>
			</div>
		</div>
	);
}

export default CreateProduct;
