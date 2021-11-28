const mainDiv = document.querySelector('main')
const regionsDiv = document.getElementById('regions')

regionsDiv.addEventListener('click', function (event) {
	console.log(event.target)
})

const createCountryEl = (country) => {
	let containerDiv = document.createElement('div')
	containerDiv.classList.add('mt-14', 'mx-6', 'bg-white', 'rounded-lg', 'overflow-hidden', 'shadow-md', 'dark:text-white', 'dark:bg-dark-blue-element')
	
	let imageEl = document.createElement('img')
	imageEl.src = `${country.flag}`
	imageEl.alt = `${country.name}`
	
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
	
	containerDiv.append(imageEl, h3El, populationPEl, regionPEl, capitalPEl)

	mainDiv.appendChild(containerDiv)
}

fetch('https://restcountries.com/v2/all')
	.then(res => res.json())
	.then(data => {
		data.map(country => createCountryEl(country))
	})