// main.js
import { sendDataToServer } from './class.js';
// const sample = new sample();
let i = 0;
const contentLists = {};

document.addEventListener("DOMContentLoaded", () => {
    // const contentList = [];
    const button1 = document.getElementById("button1");
    const text1 = document.getElementById("content1");
    const text2 = document.getElementById("content2"); 
    button1.addEventListener("click", function() {
        let message1 = text1.value;
        let message2 = text2.value;

        if (message1.replace(/[\s\u3000]/g, "") == "" || message2.replace(/[\s\u3000]/g, "") == "") {
            alert("入力しな");
            return;
        }
        if (Object.values(contentLists).some(([word, meaning]) => word === message1 && meaning === message2)) {
            alert("同じ入力があるよ。もう一回入力しな");
            return;
        }
        i++;
        contentLists[i] = [];
        contentLists[i].push(message1.replace(/[\s\u3000]/g, ""));
        contentLists[i].push(message2.replace(/[\s\u3000]/g, ""));
        console.log(i + ":"+ contentLists[i]);
        text1.value = "";
        text2.value = "";

        const wordDiv = document.getElementById("word");
        const meaningDiv = document.getElementById("meaning");
        // const resultDiv = document.getElementById("result");
        const wordContent = document.createElement('div');
        const meaningContent = document.createElement('div');
        // const newContent = document.createElement('div');
        wordContent.id = "id" + i;
        meaningContent.id = "id" + i;
        // newContent.id = "id" + i
        const content1 = contentLists[i][0];
        const content2 = contentLists[i][1];
        wordContent.textContent = `${i}: ${content1}`;
        meaningContent.textContent = `${i}: ${content2}`;
        // newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
        wordDiv.appendChild(wordContent);
        meaningDiv.appendChild(meaningContent);
        // resultDiv.appendChild(newContent);
        sendDataToServer(contentLists)
        .then(data => {
            if (data.status === "success") {
                // console.log(data);
                const wordDiv = document.getElementById("word");
                const meaningDiv = document.getElementById("meaning");
                // const resultDiv = document.getElementById("result");
                const wordContent = document.createElement('div');
                const meaningContent = document.createElement('div');
                // const newContent = document.createElement('div');
                wordContent.id = "id" + i;
                meaningContent.id = "id" + i;
                // newContent.id = "id" + i
                const content1 = contentLists[i][0];
                const content2 = contentLists[i][1];
                wordContent.textContent = `${i}: ${content1}`;
                meaningContent.textContent = `${i}: ${content2}`;
                // newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
                wordDiv.appendChild(wordContent);
                meaningDiv.appendChild(meaningContent);
                // resultDiv.appendChild(newContent);
            }else{
                // console.error(data);
            }
        });
        document.addEventListener("click", () => {
            
        });
    });
    const texts = [text1, text2];
    for(let i=0;i<2;i++) {
        const current = texts[i];
        const complement = texts[!i + 0];//[]の中は0,1を反転させるやつです。ようするにcurrentでない方を取得します。覚えなくていいです。貴方がjsFuckをしない限り。
        current.addEventListener('keydown', (e) => {
            if(e.key != "Enter") return;
            if(current.value.replace(/[\s\u3000]/g, "") == "") {
                alert("入力しろや");
                return;
            } else if(complement.value.replace(/[\s\u3000]/g, "") == "") {
                complement.focus();
            } else {
                button1.click();
            }
        })
    }
});