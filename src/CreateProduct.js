import React, { useEffect, useState } from 'react';
import { db, auth } from './config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
	const navigate = useNavigate();

	const [categoriesList, setCategoriesList] = useState([]);
	const [statusList, setStatusList] = useState([]);
	const [validationError, setValidationError] = useState(null);

	const productsCollectionRef = collection(db, "Products");
	const categoriesCollectionRef = collection(db, "Categories");
	const statusCollectionRef = collection(db, "Status");

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const Categoriesdata = await getDocs(categoriesCollectionRef);
				const filteredCategoriesData = Categoriesdata.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setCategoriesList(filteredCategoriesData);
			} catch (err) {
				console.error(err);
			}
		};

		const fetchStatus = async () => {
			try {
				const Statusdata = await getDocs(statusCollectionRef);
				const filteredStatusData = Statusdata.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}));
				setStatusList(filteredStatusData);
			} catch (err) {
				console.error(err);
			}
		};

		fetchCategories();
		fetchStatus();
	}, []);

	const [newProductName, setNewProductName] = useState("");
	const [newImgURL, setNewImgURL] = useState("");
	const [newPricePerDay, setNewPricePerDay] = useState(0);
	const [selectedStatus, setSelectedStatus] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");

	const onSubmitProduct = async () => {
		// Perform validation
		if (
			newProductName.trim() === '' ||
			newImgURL.trim() === '' ||
			newPricePerDay <= 0 ||
			selectedStatus === '' ||
			selectedCategory === ''
		) {
			setValidationError('Please fill out all fields correctly.');
			return;
		}

		// Clear any previous validation errors
		setValidationError(null);

		try {
			await addDoc(productsCollectionRef, {
				ProductName: newProductName,
				ImgURL: newImgURL,
				PricePerDay: newPricePerDay,
				userId: auth?.currentUser?.uid,
				StatusID: selectedStatus,
				CategoryID: selectedCategory,
			});
			navigate('/products');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div>
				<input
					placeholder="Product Name..."
					onChange={(e) => setNewProductName(e.target.value)}
				/>
				<input
					placeholder="Img URL..."
					onChange={(e) => setNewImgURL(e.target.value)}
				/>
				<input
					placeholder="Price per day..."
					type="number"
					onChange={(e) => setNewPricePerDay(Number(e.target.value))}
				/>

				<select onChange={(e) => setSelectedStatus(e.target.value)}>
					<option value="">Select Status</option>
					{statusList.map((status) => (
						<option key={status.id} value={status.id}>
							{status.StatusName}
						</option>
					))}
				</select>

				<select onChange={(e) => setSelectedCategory(e.target.value)}>
					<option value="">Select Category</option>
					{categoriesList.map((category) => (
						<option key={category.id} value={category.id}>
							{category.CategoryName}
						</option>
					))}
				</select>

				<button onClick={onSubmitProduct}>Submit Product</button>

				{validationError && <p style={{ color: 'red' }}>{validationError}</p>}
			</div>
		</>
	);
}

export default CreateProduct;
