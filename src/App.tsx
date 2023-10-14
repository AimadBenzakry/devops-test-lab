import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import { Heart } from "lucide-react";
import Favorites from "./components/Favorites";
import { Recipe } from "./types";

const APP_ID = "286f21ea";
const APP_key = "40214e71fce6fcc938c0a03780d19e8b";

function App() {
	const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		const data = (
			localStorage.getItem("favoriteRecipes") ? JSON.parse(localStorage.getItem("favoriteRecipes") || "") : []
		) as Recipe[];
		setFavoriteRecipes(data);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=20`;
		const response = await fetch(baseURL);
		const data = await response.json();
		setRecipes(data.hits);
	};

	const handleFavoritesOpen = () => {
		const favoritesContainer = document.querySelector(".favorites-container");
		if (favoritesContainer) {
			favoritesContainer.classList.add("active");
		}
	};

	return (
		<div>
			<nav className="nav">
				<div className="favorite-box" onClick={handleFavoritesOpen}>
					<Heart color="red" size={40} />
					<span className="favorite__text">Favorites</span>
				</div>
			</nav>
			<section>
				<div className="container initial">
					<h1 className="brand">Recipe App</h1>
					<form onSubmit={handleSubmit}>
						<input type="text" placeholder="Search Your Recipe..." onChange={handleChange} />
					</form>
					<div className="search-result">
						{recipes.map(({ recipe }, i) => (
							<Card recipe={recipe} key={i} favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes} />
						))}
					</div>
				</div>
			</section>
			<Favorites favoriteRecipes={favoriteRecipes} setFavoriteRecipes={setFavoriteRecipes} />
		</div>
	);
}

export default App;
