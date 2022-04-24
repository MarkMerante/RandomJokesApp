import React from "react"

export default function Joke() {
    const [category, setCategory] = React.useState({
        categories: ""
    })
    const [jokes, setjoke] = React.useState({
        joke: ""
    })
    let url = `https://v2.jokeapi.dev/joke/${category.categories}`
    React.useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(function(data) {
                if (data.type == "single") {
                    setjoke(prevJoke => ({...prevJoke, joke: `${data.joke}` }))}
                else if (data.type == "twopart") {
                    setjoke(prevJoke => ({
                        ...prevJoke,
                        joke: `${data.setup}` + "\n" + `${data.delivery}`
                    }))}
            
            })
    }, [category])
    
    function getJoke() {
        let selectOptions = document.getElementById("categories")
        let result = selectOptions.options[selectOptions.selectedIndex].value

        setCategory(prevCategory => ({
            ...prevCategory,
            categories: `${result}`
        }))
    }

    function handleChange(event) {
        console.log(event)
        const {name, value} = event.target
        setCategory(prevCategory => {
            return {
                ...prevCategory,
                [name] : value
            }
        })
    }



    return (
        <main className="main">
            <select
                className="select"
                id="categories"
                value={category.categories}
                onChange={handleChange}
                name="categories"
            >
                <option value="">-- Choose --</option>
                <option value="Any">Any</option>
                <option value="Programming">Programming</option>
                <option value="Dark">Dark</option>
                <option value="Pun">Pun</option>
                <option value="Spooky">Spooky</option>
                <option value="Christmas">Christmas</option>
            </select>
            <button
                className="form--button"
                onClick={getJoke}
            >
                Get more {category.categories} Jokes
            </button>
            
            <div className="jokesClass">
                <h2>{jokes.joke}</h2>
            </div>
        </main>
    )
}