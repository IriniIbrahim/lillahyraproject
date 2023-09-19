import React, { useEffect, useState, useCallback } from 'react';
import { auth, db } from './config/firebase';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, query, where } from 'firebase/firestore';
import './Products.css'; // Import your CSS file
import { MagnifyingGlass } from "phosphor-react";
import StrollerImage from "./assets/baby-stroller.gif";
import FeedingImage from "./assets/milk-bottle.gif";
import CribImage from "./assets/cradle.gif";
import CarSeatImage from "./assets/safety-belt.gif";
import BouncerImage from "./assets/rocking-horse.gif";
import AllProductsImage from "./assets/rubber-duck.gif";
import emailjs from 'emailjs-com';

function Products() {
	const navigate = useNavigate();

	const [productList, setProductList] = useState([]);
	const [categoriesList, setCategoriesList] = useState([]);
	const [statusList, setStatusList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [categoryMapping, setCategoryMapping] = useState({});
	const [userEmails, setUserEmails] = useState({});

	const productsCollectionRef = collection(db, 'Products');
	const categoriesCollectionRef = collection(db, 'Categories');
	const statusCollectionRef = collection(db, 'Status');
	const usersCollectionRef = collection(db, 'Users');

	const categoryImages = {
		"Stroller": StrollerImage,
		"Feeding": FeedingImage,
		"Crib": CribImage,
		"Carseat": CarSeatImage,
		"Bouncers": BouncerImage,
	};
	const sendEmailToSeller = (product) => {
		// Check if the user is logged in before sending the email
		if (!auth.currentUser) {
			alert('Please log in to send an email to the seller.');
			return; // Exit the function if the user is not logged in
		}

		const emailParams = {
			to_email: userEmails[product.id],
			from_name: auth.currentUser.email,
			subject: `Inquiry about ${product.ProductName}`,
			message: `I am interested in your product ${product.ProductName}. 
            Here are the details:
            - Product Name: ${product.ProductName}
            - Price per day: ${product.PricePerDay} Kr
            - Category: ${categoryMapping[product.CategoryID]}
            - Status: ${statusList.find((status) => status.id === product.StatusID)?.StatusName || 'Unknown'}
            Please provide me with more details.`,
		};
		emailjs.send(
			'service_k0kvpac',
			'template_auvskre',
			emailParams,
			'uzikgbxUWkhxWIw4k'
		)
			.then((response) => {
				console.log('Email sent successfully:', response);
				alert('Email sent successfully to the seller.');
			})
			.catch((error) => {
				console.error('Email error:', error);
				alert('Error sending email. Please try again later. Error: ' + error.message);
			});
	};

	const getProductsList = useCallback(async () => {
		try {
			const productData = await getDocs(productsCollectionRef);
			const categoriesData = await getDocs(categoriesCollectionRef);
			const statusData = await getDocs(statusCollectionRef);

			const filteredProductData = productData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			const filteredCategoriesData = categoriesData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			const filteredStatusData = statusData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setProductList(filteredProductData);
			setCategoriesList(filteredCategoriesData);
			setStatusList(filteredStatusData);

			const categoryMappingObject = {};
			filteredCategoriesData.forEach((category) => {
				categoryMappingObject[category.CategoryName] = category.id;
			});
			setCategoryMapping(categoryMappingObject);

			const userEmailPromises = filteredProductData.map(async (product) => {
				const userQuery = query(usersCollectionRef, where("userId", "==", product.userId));
				const userQuerySnapshot = await getDocs(userQuery);

				if (!userQuerySnapshot.empty) {
					const userDoc = userQuerySnapshot.docs[0];
					return { productId: product.id, email: userDoc.data().email };
				} else {
					return { productId: product.id, email: 'Unknown' };
				}
			});

			const userEmailResults = await Promise.all(userEmailPromises);

			const userEmailObject = {};
			userEmailResults.forEach((result) => {
				userEmailObject[result.productId] = result.email;
			});

			setUserEmails(userEmailObject);
		} catch (err) {
			console.error('Error fetching data:', err);
		}
	}, [categoriesCollectionRef, productsCollectionRef, statusCollectionRef, usersCollectionRef]);

	useEffect(() => {
		getProductsList();
	}, [getProductsList, categoriesCollectionRef, productsCollectionRef, statusCollectionRef, usersCollectionRef]);

	const handleCategoryChange = (categoryName) => {
		setSelectedCategory(categoryName);
	};

	const handleSearch = () => {
		// Handle your search logic here
	};

	return (
		<div className="ProductsWrapper">
			<div className="filters">
				<div className="category-filter">
					<div className="category-buttons">
						<button
							onClick={() => handleCategoryChange('')} className='category-button '>
							<img src={AllProductsImage} alt="All products" style={{ width: "30px" }} />
							All Categories
						</button>
						{categoriesList.map((category) => (
							<button
								key={category.id}
								onClick={() => handleCategoryChange(category.CategoryName)} className='category-button '>
								<img src={categoryImages[category.CategoryName]} alt={category.CategoryName} style={{ width: "30px" }} />
								{category.CategoryName}
							</button>
						))}
					</div>
				</div>
				<div className="search-filter">
					<div className="searchwrapper">
						<input
							type="text"
							id="searchInput"
							placeholder="Search products"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)} className='searchfield'
						/>
						<button className="searchbtn" onClick={handleSearch}>
							<MagnifyingGlass size={15} weight="bold" />
						</button>
					</div>
				</div>
			</div>
			<div className="Products">
				{productList
					.filter((product) =>
						(!selectedCategory || product.CategoryID === categoryMapping[selectedCategory]) &&
						(!searchQuery || product.ProductName.toLowerCase().includes(searchQuery.toLowerCase()))
					)
					.map((product) => {
						const category = categoriesList.find((category) => category.id === product.CategoryID);
						const status = statusList.find((status) => status.id === product.StatusID);

						return (
							<div className="product-item" key={product.id}>
								<img src={product.ImgURL} alt={product.ProductName} />
								<h1>{product.ProductName}</h1>

								<div className='ProductDetails'>
									<p>Price per day: {product.PricePerDay} Kr</p>
									{category && <p>Category: {category.CategoryName}</p>}
									{status && <p>Status: {status.StatusName}</p>}
									<p>Seller Email: {userEmails[product.id]}</p>
								</div>
								{/* Render the "Send Email" button conditionally */}
								{auth.currentUser ? (
									<button className='sendEmailbtn' onClick={() => sendEmailToSeller(product)}>Send Email to Seller</button>
								) : (
									<button className='sendEmailbtn' onClick={() => navigate('/login')} >Login to send email to seller</button>
								)}
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default Products;
