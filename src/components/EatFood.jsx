/* eslint-disable react/prop-types */
const EatFood = ({food}) => {
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>{food.name}</h2>
            <input type="number" name="amount" />
            <p>{food.unit}</p>
            <input type="submit" value="Eat"/>

        </form>
    )
}

export default EatFood;