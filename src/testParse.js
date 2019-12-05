const rows = document.querySelectorAll(".turnirsortlist .table_row_guest")


let results = []
for (let row of rows) {
	console.log(row.childNodes[21].childNodes[0][0].data) // .childNodes.data) // xG
}

// clear
results = []
for (let row of rows) {results.push([])}


// save via index
rows.forEach((row, index)=>{
	results[index].push(row.childNodes[21].childNodes[0].data)
})