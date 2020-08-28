/*
Review The National Parks Services API documentation and create an API key.
Review the API Guide on Authentication for ways to pass your API key as part of the request.
Review the /parks endpoint and data model to understand how it works.
Create a new app and push it to GitHub.
When you're done, submit the link to your GitHub repo at the bottom of the page.*/

const apiKey = '8ftzZNjrTcRTgmJF5wcx7qKmPJNKeRmVFTSxQGkh'
const searchURL = 'https://developer.nps.gov/api/v1/parks/'

function handleSubmitClicked(){

    $('.search').submit(event => {
        event.preventDefault()
        //The user must be able to search for parks in one or more states.
        let states = $('#js-states').val()
        //The user must be able to set the max number of results, with a default of 10.
        console.log(states)
        let maxResults = 0
        if($('#js-max-results').val()){
            maxResults = $('#js-max-results').val()
        }else{
            maxResults = 10;
        }        
        //$('form')[0].reset()
        getParkResults(states,maxResults)
        console.log(states + ' ' + maxResults)
    })

}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParkResults(states, maxResults){
//The search must trigger a call to NPS's API.
    const params = {        
        stateCode: states,
        limit: maxResults,
        api_key: apiKey
    }

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
        return response.json()
        }
        throw new Error(response.statusText)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`)
    })
    
}


function displayResults(responseJson){
//The parks in the given state must be displayed on the page. Include at least:
//Full name
//Description
//Website URL

//As a stretch goal, try adding the park's address to the results.

    console.log(responseJson)

    let parks = []
    //use a for loop to append to a ul 
    for (let i = 0; i < responseJson.data.length; i++){
        parks.push(`
            <li><h3>${responseJson.data[i].fullName}</h3>
                <p class="description">Description: ${responseJson.data[i].description}</p>
                <p class="link">Link: <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
                <p class="address">Address: ${responseJson.data[i].addresses[0].line1 + ' ' + responseJson.data[i].addresses[0].line2 + ' ' + responseJson.data[i].addresses[0].line3 + ', ' + 
                    responseJson.data[i].addresses[0].city + ', ' + responseJson.data[i].addresses[0].stateCode + ' ' + responseJson.data[i].addresses[0].postalCode}</p>
            </li>`)
     console.log(parks)
    }

    $('.search-results').empty().append(parks)
    $('section').removeClass('hidden')

}




$(handleSubmitClicked)