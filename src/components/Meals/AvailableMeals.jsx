import { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css"
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    const getMeals = async() =>{
      const url = ''
      const response = await fetch(url)
      const result =  await response.json()

      if (!response.ok) {
        throw new Error('Something went wrong!')
      }

          
      const loadedMeals = [];

      for(const key in result){
        loadedMeals.push({
          id: key,
          name: result[key].name,
          description: result[key].description,
          price: result[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    getMeals().catch(error =>{
      setIsLoading(false)
      setHttpError(error.message);
    })
  }, [])


  if(isLoading) {
    return <section className={styles.MealsLoading}><p>loading...</p></section>
  }

  if(httpError){
    return <section className={styles.MealsError}><p>{httpError}</p></section>
  }

    const mealsList = meals.map( meal => 
    <MealItem
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price}
         />
    );

    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
            
        </section>
    )
}

export default AvailableMeals
