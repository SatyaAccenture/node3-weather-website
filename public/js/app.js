console.log('Clien side java script loaded')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'loading...'
    const location = search.value
    if ("" === location || undefined === location || null === location) {
        console.log('please enter valid address')
        messageOne.textContent = ''
        messageTwo.textContent = 'please enter valid address'
    } else {
        const url = 'http://localhost:3000/weather?location=' + location
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = ''
                    messageTwo.textContent = data.error
                } else {
                    console.log(data.forcast)
                    console.log(data.location)
                    console.log(data.address)
                    messageOne.textContent = 'Forcast: ' + data.forcast + "\r\n" +
                        'Location: ' + data.location + "\r\n" +
                        'Address: ' + data.address

                }

            })

        })
    }

})