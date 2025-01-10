// class.js
export function sendDataToServer(contentLists) {
    const jsonData = JSON.stringify(contentLists);
    return fetch('http://localhost:PORT/api/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('サーバーへの送信中にエラーが発生しました:', error);
        throw error;
    });
}

export function fetchDataFromServer() {
    return fetch('http://localhost:PORT/api/data', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('サーバーからのデータ取得中にエラーが発生しました:', error);
        throw error;
    });
}

export function updateDataOnServer(contentLists) {
    const jsonData = JSON.stringify(contentLists);
    return fetch('http://localhost:PORT/api/data', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => {
        console.error('サーバーへの送信中にエラーが発生しました:', error);
        throw error;
    });
}
