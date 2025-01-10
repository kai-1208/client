import { fetchDataFromServer } from './class.js';

document.addEventListener("DOMContentLoaded", () => {
    const wordDiv = document.getElementById("word");
    const meaningDiv = document.getElementById("meaning");
    const button3 = document.getElementById("button3");

    const displayData = (data) => {
        wordDiv.innerHTML = ""; // 既存の内容をクリア
        meaningDiv.innerHTML = ""; // 既存の内容をクリア

        data.forEach((item, index) => {
            const wordContent = document.createElement('div');
            const meaningContent = document.createElement('div');

            wordContent.id = "word" + index;
            meaningContent.id = "meaning" + index;

            const content1 = item[0];
            const content2 = item[1];
            wordContent.textContent = `${index}: ${content1}`;
            meaningContent.textContent = `${index}: ${content2}`;

            wordDiv.appendChild(wordContent);
            meaningDiv.appendChild(meaningContent);

            // クリックイベントを追加してCSSを変更する
            wordContent.addEventListener("click", () => {
                wordContent.classList.toggle("clicked");
            });
            meaningContent.addEventListener("click", () => {
                meaningContent.classList.toggle("clicked");
            });
        });
    };

    // ページが読み込まれたときにデータを取得して表示する
    fetchDataFromServer()
    .then(data => {
        if (data.status === "success") {
            displayData(Object.values(data.contentLists));
        } else {
            console.error("サーバーからのデータ取得が失敗しました。");
        }
    })
    .catch(error => {
        console.error("サーバーからのデータ取得中にエラーが発生しました:", error);
    });

    button3.addEventListener("click", () => {
        window.location.href = "./edit.html";
    });
});