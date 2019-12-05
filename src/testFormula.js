const foo = (data) => {
    let [xG, xGa, xGd, gdminusxgd, xGnassh, xGanassh, xG90, xGa90, ppda] = data.map(parseFloat)
    return parseFloat(((xG * 7 - xGa * 8 + xGd * 9 - gdminusxgd * 1 + xGnassh * 6 - xGanassh * 5 + xG90 * 2 + xGa90 * 3 + ppda * 4) / 1000).toFixed(2))
}

const data = [
    [30.1, "13.3", 16.8, 3.2, "0.14", 0.1, 2.08, 0.92, 10.25]
]

for (let d of results) {
    console.log((((parseFloat(parseFloat(foo(d)).toFixed(2))) + 0.25) / 0.67).toFixed(2))
}

