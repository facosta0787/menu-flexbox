function fetchData(){
  return fetch('https://restcountries.eu/rest/v2/all')
  .then( data => data.json())
}

function countriesHasher(countries) {
  return countries.reduce((countryHash, country) => ({
    ...countryHash,
    [country.region || 'No Region']: countryHash[country.region] ? [...countryHash[country.region], country] : [country]
  }), {});
}

function sortByRegion(countries){
  const sortedCountries = []
  countries.forEach( country => {
    if(!sortedCountries.find( region => region.region === country.region )){
      sortedCountries.push({region:country.region,countries:[country]})
    }else{
      sortedCountries.find(region => region.region === country.region).countries.push(country)
    }
  })
  sortedCountries[sortedCountries.findIndex(region => region.region === '')].region = 'N/A'
  return sortedCountries
}

function articleTemplate({flag, name, capital, population, languages, region}){
  return `<article>
  <img src="${flag}" alt="${name}" />
  <h3>${name}</h3>
  <p>Capital: ${capital}</p>
  <p>Population: ${numeral(population).format('0,0')}</p>
  <p>Languages: ${languages.map(lang => lang.name).join(', ')}</p>
  <p>Region: ${region}</p>
</article>
  `
}

function mountCountries(countries){
  console.log(countries)
  console.log('Object',countriesHasher(countries))
  console.log('Array',sortByRegion(countries))
  let content = document.querySelector('.content')
  content.innerHTML = countries.map(articleTemplate).join('')
}


fetchData().then(mountCountries)
