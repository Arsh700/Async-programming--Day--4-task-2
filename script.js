// Function for create element

//client id
const client_id = "4Hfz0hd6aJyfmslvMrke9MlKawzxinY-LM-sNBzY0vg"
// For pagination
let pages = 0
//Length of the array of photos to calculate the maximum pages for pagination
let length = 0
//pages variable to dynamicaly change the amount of photos per page
let numberofpage = "15" //Default page = 15
// orientation of the photos
// let modal = ["landscape", "portrait", "squarish"]
// let query = ""
// let orientationofimg = "portrait"
let search = false

var createElement = element => {
	var element = document.createElement(element)
	return element
}
var request = async () => {
	try {
		var url = `https://api.unsplash.com/photos/?client_id=${client_id}&color=yellow&query=toy&page=${pages}&per_page=${numberofpage}`
		var response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		var e = await response.json()
		//iterate the data to show all the images
		e.map(e => {
			if (e.width > e.height) {
				//The length of the longest side determines the orientation. For example, if the height of the image is longer than the width, it is a “portrait” format. Images where the width is longer are called “landscape.”
				let data = e.urls.small_s3 // thumb image
				let img_container = document.querySelector(".fixed-img") //img tag
				let newElement = createElement("img")
				newElement.setAttribute("class", "down_img landscape_img")
				newElement.setAttribute("onClick", "effect(this)")
				newElement.src = data
				img_container.append(newElement)
			} else {
				let data = e.urls.small_s3 // thumb image
				let img_container = document.querySelector(".fixed-img") //img tag
				let newElement = createElement("img")
				newElement.setAttribute("class", "down_img")
				newElement.setAttribute("onClick", "effect(this)")
				newElement.src = data
				img_container.append(newElement)
			}
		})

		var responseLength = await e.length
		length = responseLength
		// console.log(e, "length :", responseLength)
	} catch (error) {
		console.log(error)
	}
}

request()

function previous() {
	let checkminusvalue = document.querySelector(".boxA").innerText // fetch the first pagination inner text to calculate the other box
	// Previous
	var q = document.querySelector("#searchinput").value
	if (q) {
		if (checkminusvalue != 1 && pages < length) {
			pages--
			document.querySelector(".fixed-img").innerHTML = "" //to show new data it delete all existing data
			console.log("previous")
			let box03 = document.querySelector(".boxC").innerText
			let box02 = document.querySelector(".boxB").innerText
			let box01 = document.querySelector(".boxA").innerText
			console.log(parseInt(box01), box02, box03)
			searchimg()
			document.querySelector(".boxA").innerText = parseInt(box01) - 3 // minus the data to get the previous pagination number
			document.querySelector(".boxB").innerText = parseInt(box02) - 3 // minus the data to get the previous pagination number
			document.querySelector(".boxC").innerText = parseInt(box03) - 3 // minus the data to get the previous pagination number
		}
	} else {
		if (checkminusvalue != 1 && pages < length) {
			pages--
			document.querySelector(".fixed-img").innerHTML = "" //to show new data it delete all existing data
			console.log("previous")
			let box03 = document.querySelector(".boxC").innerText
			let box02 = document.querySelector(".boxB").innerText
			let box01 = document.querySelector(".boxA").innerText
			console.log(parseInt(box01), box02, box03)
			request()
			document.querySelector(".boxA").innerText = parseInt(box01) - 3 // minus the data to get the previous pagination number
			document.querySelector(".boxB").innerText = parseInt(box02) - 3 // minus the data to get the previous pagination number
			document.querySelector(".boxC").innerText = parseInt(box03) - 3 // minus the data to get the previous pagination number
		}
	}
}

function next() {
	var q = document.querySelector("#searchinput").value
	if (q) {
		if (pages < length) {
			pages++
			document.querySelector(".fixed-img").innerHTML = "" //to show new data it delete all existing data
			console.log("next")
			let box03 = document.querySelector(".boxC").innerText
			let box02 = document.querySelector(".boxB").innerText
			let box01 = document.querySelector(".boxA").innerText
			console.log(parseInt(box01), box02, box03)
			searchimg()
			document.querySelector(".boxA").innerText = parseInt(box03) + 1 // Plus the data to get the next pagination number
			document.querySelector(".boxB").innerText = parseInt(box03) + 2 // Plus the data to get the next pagination number
			document.querySelector(".boxC").innerText = parseInt(box03) + 3 // Plus the data to get the next pagination number
		} else alert("Max page")
	} else {
		if (pages < length) {
			if (pages === 0) {
				pages = pages + 2
			}
			pages++
			document.querySelector(".fixed-img").innerHTML = "" //to show new data it delete all existing data
			console.log("next")
			let box03 = document.querySelector(".boxC").innerText
			let box02 = document.querySelector(".boxB").innerText
			let box01 = document.querySelector(".boxA").innerText
			console.log(parseInt(box01), box02, box03)
			request()
			document.querySelector(".boxA").innerText = parseInt(box03) + 1 // Plus the data to get the next pagination number
			document.querySelector(".boxB").innerText = parseInt(box03) + 2 // Plus the data to get the next pagination number
			document.querySelector(".boxC").innerText = parseInt(box03) + 3 // Plus the data to get the next pagination number
		} else alert("Max page")
	}
}

function pageClick(e) {
	// fetch the particular page data related to the clicked number
	var q = document.querySelector("#searchinput").value
	if (q) {
		pages = parseInt(e.innerText)
		document.querySelector(".fixed-img").innerHTML = ""
		searchimg()
		console.log(e.innerText)
	} else {
		pages = parseInt(e.innerText)
		document.querySelector(".fixed-img").innerHTML = ""
		request()
		console.log(e.innerText)
	}
}

var requestForRawimage = async () => {
	let q = document.querySelector("#searchinput").value
	if (search) {
		try {
			var url = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${q}&page=${pages}&per_page=${numberofpage}`
			var response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			var e = await response.json()
			console.log(e)
			return e
		} catch (e) {
			console.log(e)
		}
	} else {
		// To show the best quality image into the hover popup
		try {
			var url = `https://api.unsplash.com/photos/?client_id=${client_id}&page=${pages}&per_page=${numberofpage}`
			var response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			return await response.json()
		} catch (error) {
			console.log("requestForRawimage", error)
		}
	}
}

function effect(e) {
	// popup to show the clicked image
	let data = e.src // get the source to split
	let split = data.split("-")
	console.log(split)
	let selectedImg = split[1] //get the exact number of thumb image
	let selectedrawImg = split[3] // get the exact number of raw image

	requestForRawimage().then(res => {
		console.log(res)
		let firstIsresult = res.results
		if (firstIsresult) {
			res.results.map(e => {
				let rawimgdata = e.urls.raw //RAW image url

				let splitrawdata = rawimgdata.split("-") // get the exact number of image
				console.log(splitrawdata)
				if (splitrawdata.includes(selectedImg) || splitrawdata.includes(selectedrawImg)) {
					//if source number and raw image number is matched
					console.log("aaaaaaaaaaaaa results aaaaaaaaaaaaaaaa")
					document.getElementById("myNav").style.width = "100%"
					document.querySelector(".img-hover").style.width = "40%"
					let element = document.querySelector(".img-hover")
					element.src = ""
					element.src = rawimgdata // Add raw image into element
					let element1 = document.querySelector(".img-dowload") // Dowload button
					element1.href = e.links.download // Add download link to href attribute
					console.log(e.links.download)

					console.log(e.src)
				}
			})
		} else {
			res.map(e => {
				let rawimgdata = e.urls.raw //RAW image url

				let splitrawdata = rawimgdata.split("-") // get the exact number of image
				console.log(splitrawdata)
				if (splitrawdata.includes(selectedImg) || splitrawdata.includes(selectedrawImg)) {
					//if source number and raw image number is matched
					console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
					document.getElementById("myNav").style.width = "100%"
					document.querySelector(".img-hover").style.width = "40%"
					let element = document.querySelector(".img-hover")
					element.src = ""
					element.src = rawimgdata // Add raw image into element
					let element1 = document.querySelector(".img-dowload") // Dowload button
					element1.href = e.links.download // Add download link to href attribute
					console.log(e.links.download)

					console.log(e.src)
				}
			})
		}
	})
}

function numberofimgpages(e) {
	// Number of images per page
	let totalpages = document.querySelector("#numberofpage")
	var q = document.querySelector("#searchinput").value
	if (q) {
		if (parseInt(totalpages.value) <= 31) {
			document.querySelector(".fixed-img").innerHTML = ""
			numberofpage = totalpages.value
			searchimg()
			console.log(e.innerText)
		} else alert("Max limit : 30 photos per page")
	} else {
		if (parseInt(totalpages.value) <= 31) {
			document.querySelector(".fixed-img").innerHTML = ""
			numberofpage = totalpages.value
			request()
			console.log(e.innerText)
		} else alert("Max limit : 30 photos per page")
	}
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
	document.getElementById("myNav").style.width = "0%"
}

function closethehoverimg() {
	document.getElementById("myNav").style.width = "0%"
}

async function searchimg(e) {

	gtag('event', 'search_cta_test_final', {
    'how_many_search_clicks': 'user',
'user_search_value':e.target.value
   
  });
	search = true
	var q = document.querySelector("#searchinput").value
	// console.log(q)
	try {
		var url = `https://api.unsplash.com/search/photos/?client_id=${client_id}&query=${q}&page=${pages}&per_page=${numberofpage}`
		var response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		var e = await response.json()
		//iterate the data to show all the images
		console.log(e)

		document.querySelector(".fixed-img").innerHTML = ""
		e.results.map(e => {
			// console.log(e.urls.small_s3)
			if (e.width > e.height) {
				//The length of the longest side determines the orientation. For example, if the height of the image is longer than the width, it is a “portrait” format. Images where the width is longer are called “landscape.”
				let data = e.urls.small_s3 // thumb image

				let img_container = document.querySelector(".fixed-img") //img tag
				let newElement = createElement("img")
				newElement.setAttribute("class", "down_img landscape_img")
				newElement.setAttribute("onClick", "effect(this)")
				newElement.src = data
				img_container.append(newElement)
			} else {
				let data = e.urls.small_s3 // thumb image

				let img_container = document.querySelector(".fixed-img") //img tag
				let newElement = createElement("img")
				newElement.setAttribute("class", "down_img")
				newElement.setAttribute("onClick", "effect(this)")
				newElement.src = data
				img_container.append(newElement)
			}
		})
	} catch (error) {
		console.log("requestForsearch", error)
	}
}
