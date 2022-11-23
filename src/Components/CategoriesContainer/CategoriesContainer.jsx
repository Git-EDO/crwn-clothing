import CategoryItem from '../CategoryItem/CategoryItem'
import './CategoriesContainer.style.scss'

const CategoriesContainer = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoriesContainer
