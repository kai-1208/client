// class.js
export function sendDataToServer(contentLists) {
    const jsonData = JSON.stringify(contentLists);
    fetch('http://localhost:PORT/api/data',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(responce =>{
        if(!responce.ok){
            return responce.json();
        }
    })
    .then(data => console.log(data))
    .catch((error) => console.log(error));
}