import React, { useEffect, useState } from 'react';
import { db, auth, storage } from './config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "./CreateProduct.css"
import baby from "./assets/Sleeping baby-cuate.svg"
function CreateProduct() {
	const navigate = useNavigate();

	const [categoriesList, setCategoriesList] = useState([]);
	const [statusList, setStatusList] = useState([]);
	const [validationError, setValidationError] = useState(null);
	const [newProduct, setNewProduct] = useState({
		name: '',
		imgURL: null,
		pricePerDay: 0,
		status: '',
		category: '',
	});

	const productsCollectionRef = collection(db, 'Products');
	const categoriesCollectionRef = collection(db, 'Categories');
	const statusCollectionRef = collection(db, 'Status');

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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewProduct((prevProduct) => ({
			...prevProduct,
			[name]: value,
		}));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setNewProduct((prevProduct) => ({
			...prevProduct,
			imgURL: file,
		}));
	};

	const onSubmitProduct = async () => {
		const { name, imgURL, pricePerDay, status, category } = newProduct;

		if (
			name.trim() === '' ||
			!imgURL ||
			pricePerDay <= 0 ||
			status === '' ||
			category === ''
		) {
			setValidationError('Please fill out all fields correctly.');
			return;
		}
		setValidationError(null);

		try {
			const imageRef = ref(storage, `projectFiles/${imgURL.name}`);
			const imageSnapshot = await uploadBytes(imageRef, imgURL);
			const downloadURL = await getDownloadURL(imageSnapshot.ref);
			const productData = {
				ProductName: name,
				PricePerDay: pricePerDay,
				userId: auth?.currentUser?.uid,
				StatusID: status,
				CategoryID: category,
				ImgURL: downloadURL,
			};

			await addDoc(productsCollectionRef, productData);

			navigate('/products');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className='CreateProductWrapper'>
				<div className='Form'>
					<img src={baby} className='baby' alt="baby" />
					<h2 style={{
						color: "#d0aef3", fontWeight: "700", paddingBottom: "20px"
					}}>Create Product</h2>
					<input
						type="text"
						name="name"
						placeholder="Product Name..."
						value={newProduct.name}
						onChange={handleInputChange} className='createproductinput'
					/>
					<input type="file" onChange={handleImageUpload} className='createproductinput' />
					<input
						type="number"
						name="pricePerDay"
						placeholder="Price per day..."
						value={newProduct.pricePerDay}
						onChange={handleInputChange} className='createproductinput'
					/>

					<select
						name="status"
						onChange={handleInputChange}
						value={newProduct.status}
					>
						<option value="">Select Status</option>
						{statusList.map((status) => (
							<option key={status.id} value={status.id}>
								{status.StatusName}
							</option>
						))}
					</select>

					<select
						name="category"
						onChange={handleInputChange}
						value={newProduct.category}
					>
						<option value="">Select Category</option>
						{categoriesList.map((category) => (
							<option key={category.id} value={category.id} className='Optionstyle'>
								{category.CategoryName}
							</option>
						))}
					</select>

					<button onClick={onSubmitProduct} className='createbtn'>Post</button>

					{validationError && <p style={{ color: "#B71C1C", fontWeight: "700", fontSize: "18px" }}>{validationError}</p>}

				</div>
			</div>
		</>
	);
}

export default CreateProduct;
