const fetchFood = async ({ queryKey }) => {
    const search = queryKey[1];

    const apiRes = await fetch(`https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl?name=${search}`, {
        headers: {
            'User-Agent': 'DailyPlate - Android - Version 1.0'
        },
    })

    if (!apiRes.ok) {
        throw new Error("Food fetch not ok")
    }

    return apiRes.json();
}

export default fetchFood;