const darkModeBtn = document.getElementById('darkModeBtn')
const mainEl = document.querySelector('main')

darkModeBtn.addEventListener('click', () => {
	if (localStorage.theme === 'dark') {
		localStorage.theme = 'light'
		document.documentElement.classList.remove('dark')
	} else {
		localStorage.theme = 'dark'
		document.documentElement.classList.add('dark')
	}
})
let url = new URL(window.location)
let country = url.searchParams.get('country')

console.log('country: ', country);

fetch(`https://restcountries.com/v2/name/${country}`)
	.then(res => res.json())
	.then(data => {
		console.log('data: ', data);

		let country = data[0]

		let countryDiv = document.createElement('div')
		countryDiv.setAttribute('class', 'sm:flex gap-10')

		let imageEl = document.createElement('img')
		imageEl.src = `${country.flag}`
		imageEl.classList.add('mt-12', 'rounded', 'h-56', 'w-full', 'sm:h-64', 'sm:w-80')

		let nameEl = document.createElement('h1')
		nameEl.textContent = country.name
		nameEl.classList.add('mt-10', 'text-xl', 'font-extrabold', 'dark:text-white')

		let nativeNameSpan = document.createElement('span')
		nativeNameSpan.textContent = 'Native Name: '
		nativeNameSpan.classList.add('font-semibold')
		let nativeNameEl = document.createElement('p')
		nativeNameEl.textContent = country.nativeName
		nativeNameEl.insertAdjacentElement('afterbegin', nativeNameSpan)
		nativeNameEl.setAttribute('class', 'mt-6 text-sm dark:text-white')
		
		let populationSpan = document.createElement('span')
		populationSpan.textContent = 'Population: '
		populationSpan.classList.add('font-semibold')
		let populationEl = document.createElement('p')
		populationEl.textContent = country.population
		populationEl.insertAdjacentElement('afterbegin', populationSpan)
		populationEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let regionSpan = document.createElement('span')
		regionSpan.textContent = 'Region: '
		regionSpan.classList.add('font-semibold')
		let regionEl = document.createElement('p')
		regionEl.textContent = country.region
		regionEl.insertAdjacentElement('afterbegin', regionSpan)
		regionEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let subRegionSpan = document.createElement('span')
		subRegionSpan.textContent = 'Sub Region: '
		subRegionSpan.classList.add('font-semibold')
		let subRegionEl = document.createElement('p')
		subRegionEl.textContent = country.subregion
		subRegionEl.insertAdjacentElement('afterbegin', subRegionSpan)
		subRegionEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let capitalSpan = document.createElement('span')
		capitalSpan.textContent = 'Capital: '
		capitalSpan.classList.add('font-semibold')
		let capitalEl = document.createElement('p')
		capitalEl.textContent = country.capital
		capitalEl.insertAdjacentElement('afterbegin', capitalSpan)
		capitalEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let domainSpan = document.createElement('span')
		domainSpan.textContent = 'Top Level Domain: '
		domainSpan.classList.add('font-semibold')
		let domainEl = document.createElement('p')
		domainEl.textContent = country.topLevelDomain[0]
		domainEl.insertAdjacentElement('afterbegin', domainSpan)
		domainEl.setAttribute('class', 'mt-8 text-sm dark:text-white')
		
		let currencySpan = document.createElement('span')
		currencySpan.textContent = 'Currencies: '
		currencySpan.classList.add('font-semibold')
		let currencyEl = document.createElement('p')
		let currencies = []
		country.currencies.map(curr => currencies.push(curr.name))
		currencyEl.textContent = currencies.join(', ')
		currencyEl.insertAdjacentElement('afterbegin', currencySpan)
		currencyEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let languageSpan = document.createElement('span')
		languageSpan.textContent = 'Languages: '
		languageSpan.classList.add('font-semibold')
		let languageEl = document.createElement('p')
		let languages = []
		country.languages.map(lang => languages.push(lang.name))
		languageEl.textContent = languages.join(', ')
		languageEl.insertAdjacentElement('afterbegin', languageSpan)
		languageEl.setAttribute('class', 'mt-3 text-sm dark:text-white')
		
		let borderCountriesEl = document.createElement('h2')
		borderCountriesEl.textContent = 'Border Countries:'
		borderCountriesEl.classList.add('font-semibold', 'mt-10', 'text-lg')

		let borderCountriesPromises = []
		country.borders?.map(country => {
			borderCountriesPromises.push(fetch(`https://restcountries.com/v2/alpha/${country}`))
		})

		let borderCountriesDiv = document.createElement('div')
		borderCountriesDiv.setAttribute('class', 'grid grid-cols-2 gap-2')
		
		Promise.all(borderCountriesPromises)
		.then((responses) => Promise.all(responses.map(response => response.json())))
		.then(data => {
			data.map(country => {
				let countryButton = document.createElement('a')
				countryButton.setAttribute('class', 'mt-4 block p-4 bg-white text-center text-sm shadow-md rounded dark:text-white dark:bg-dark-blue-element')
				countryButton.href = `/rest-countries/details.html?country=${country.name.toLowerCase()}`
				countryButton.textContent = country.name
				borderCountriesDiv.appendChild(countryButton)
			})
		})
	
		let detailsDiv = document.createElement('div')
		detailsDiv.append(nameEl, nativeNameEl, populationEl, regionEl, subRegionEl, capitalEl, domainEl, currencyEl, languageEl, borderCountriesEl, borderCountriesDiv)

		countryDiv.append(imageEl, detailsDiv)

		mainEl.appendChild(countryDiv)
	})