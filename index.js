const inputEle = document.getElementById("search")
const container=document.getElementById("container")
const message = document.getElementById("message")
const meaningContainer = document.getElementById("meaningContainer")
const title = document.getElementById("word")
const meaning = document.getElementById("mean")
const audio=document.getElementById("audio")
const funCall=async (word) =>{
    try {
         message.textContent = `Searching for the word "${word}"`
    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const options = {
        method:"GET"
        }
    const response = await fetch(url, options)
        const result = await response.json()
        meaningContainer.style.display = "block"
        message.textContent=""
        if (result.title) {
            title.innerText = word 
            meaning.innerText = "Meaning not found"
            audio.style.display="none"
        }
        else {
            audio.style.display = "block"
            audio.style.display="inline-flex"
                title.innerText = word
                meaning.textContent = result[0].meanings[0].definitions[0].definition
                audio.src = result[0].phonetics[0].audio
                if (result[0].phonetics[0].audio === '') {
                audio.src = result[0].phonetics[1].audio
                if (result[0].phonetics[1].audio === '') {
                    audio.style.display="none"
                } 
            
            }
        }

    console.log(result)
    } catch (error) {
        meaningContainer.style.display = "none"
        message.textContent = `An error happend try again`
    }
    
}
inputEle.addEventListener('keydown', (event) => {
    if (event.target.value !== '' && event.key === "Enter") {
        funCall(event.target.value)
    }
})