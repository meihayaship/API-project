async function getDefinition() {
    const word = document.getElementById("wordInput").value;
    const resultDiv = document.getElementById("result");
    
    if (!word) {
        resultDiv.innerHTML = "<p>Please enter a word.</p>";
        return;
    }
    
    resultDiv.innerHTML = "<p>Loading...</p>";
    
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();
        
        if (data.title) {
            resultDiv.innerHTML = `<p>Word not found.</p>`;
        } else {
            const meanings = data[0].meanings.map(meaning => 
                `<p><strong>${meaning.partOfSpeech}:</strong> ${meaning.definitions[0].definition}</p>`
            ).join("");
            resultDiv.innerHTML = `<h2>${data[0].word}</h2>${meanings}`;
        }
    } catch (error) {
        resultDiv.innerHTML = "<p>Error fetching definition. Please try again later.</p>";
    }
}
