const darkModeBtn = document.getElementById('darkModeBtn')
const regionFilter = document.getElementById('regionFilter')
const regionsDiv = document.getElementById('regions')
const countriesDiv = document.querySelector('#countries')
const inputEl = document.querySelector('input')

darkModeBtn.addEventListener('click', () => {
	if (localStorage.theme === 'dark') {
		localStorage.theme = 'light'
		document.documentElement.classList.remove('dark')
	} else {
		localStorage.theme = 'dark'
		document.documentElement.classList.add('dark')
	}
})

let isOpen = false
regionFilter.addEventListener('click', () => {
	if (isOpen) {
		regionsDiv.classList.add('hidden')
		isOpen = false
	} else {
		regionsDiv.classList.remove('hidden')
		isOpen = true
	}
})


const createCountryEl = (country) => {
	let containerDiv = document.createElement('div')
	containerDiv.classList.add('mt-14', 'mx-6', 'bg-white', 'rounded-lg', 'overflow-hidden', 'shadow-md', 'dark:text-white', 'dark:bg-dark-blue-element')
	containerDiv.setAttribute('data-country-name', country.name.toLowerCase())
	
	let imageAEl = document.createElement('a')
	imageAEl.href = `/rest-countries/details.html?country=${country.name.toLowerCase()}`

	let imageEl = document.createElement('img')
	imageEl.classList.add('cursor-pointer', 'h-44', 'w-full', 'object-cover')
	imageEl.src = country.flag
	imageEl.alt = country.name
	imageAEl.appendChild(imageEl)
	
	let h3El = document.createElement('h3')
	h3El.classList.add('mt-6', 'font-extrabold', 'ml-6')
	h3El.textContent = `${country.name}`
	
	let populationPEl = document.createElement('p')
	populationPEl.classList.add('mt-4', 'ml-6')
	populationPEl.textContent = `${country.population}`
	
	let populationSpanEl = document.createElement('span')
	populationSpanEl.classList.add('font-semibold')
	populationSpanEl.textContent = 'Population: '
	
	populationPEl.insertAdjacentElement("afterbegin", populationSpanEl)
	
	let regionPEl = document.createElement('p')
	regionPEl.classList.add('mt-1', 'ml-6')
	regionPEl.textContent = `${country.region}`
	
	let regionSpanEl = document.createElement('span')
	regionSpanEl.classList.add('font-semibold')
	regionSpanEl.textContent = 'Region: '
	
	regionPEl.insertAdjacentElement("afterbegin", regionSpanEl)
	
	let capitalPEl = document.createElement('p')
	capitalPEl.classList.add('mt-1', 'mb-10', 'ml-6')
	capitalPEl.textContent = `${country.capital}`
	
	let capitalSpanEl = document.createElement('span')
	capitalSpanEl.classList.add('font-semibold')
	capitalSpanEl.textContent = 'Capital: '
	
	capitalPEl.insertAdjacentElement("afterbegin", capitalSpanEl)
	
	containerDiv.append(imageAEl, h3El, populationPEl, regionPEl, capitalPEl)
	
	countriesDiv.appendChild(containerDiv)
}

fetch('https://restcountries.com/v2/all')
	.then(res => res.json())
	.then((countries) => {
		countries.map(country => createCountryEl(country))
		
		let region;
		regionsDiv.addEventListener('click', function (event) {
			region = event.target.innerText
			regionsDiv.classList.add('hidden')
			isOpen = false
		
			if (region === '') {
				countriesDiv.innerHTML = ""
				countries.map(country => createCountryEl(country))
			} else {
				countriesDiv.innerHTML = ""
				countries
				.filter(country => country.region === region)
				.map(country => createCountryEl(country))
			}
		})
		
		inputEl.addEventListener('change', (event) => {
			const searchedCountry = countries.filter(country => {
				if (country.name.toLowerCase().search(event.target.value.toLowerCase()) > -1) { 
					return country
				}
			})
		
			countriesDiv.innerHTML = ""
			searchedCountry.map(country => createCountryEl(country))
			event.target.value = ""
		})

	})