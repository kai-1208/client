// main.js
import { sendDataToServer } from './class.js';
// const sample = new sample();
let i = 0;
const contentLists = {};

document.addEventListener("DOMContentLoaded", () => {
    // const contentList = [];
    const button1 = document.getElementById("button1");
    button1.addEventListener("click", function() {
        const text1 = document.getElementById("content1");
        const text2 = document.getElementById("content2");
        let message1 = text1.value.replace(/[\s\u3000]/g, "");
        let message2 = text2.value.replace(/[\s\u3000]/g, "");

        if (message1 != "" && message2 != "") {
            i++;
            contentLists[i] = [];
            // const text1 = document.getElementById("content1");
            // const text2 = document.getElementById("content2");
            // let message1 = text1.value.replace(/[\s\u3000]/g, "");
            // let message2 = text2.value.replace(/[\s\u3000]/g, "");

            // console.log(message1);
            // console.log(message2);
            // if (message1.trim() != "" && message2.trim() != "") {
            //     contentList.push(message1);
            //     contentList.push(message2);
            //     console.log(contentList);
            // }
            contentLists[i].push(message1);
            contentLists[i].push(message2);
            console.log(i + ":"+ contentLists[i]);

            text1.value = "";
            text2.value = "";

            const resultDiv = document.getElementById("result");

            const newContent = document.createElement('div');
            newContent.id = "id" + i
            const content1 = contentLists[i][0];
            const content2 = contentLists[i][1];
            newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
            resultDiv.appendChild(newContent);

            sendDataToServer(contentLists)
            .then(data => {
                if (data.status === "success") {
                    // console.log(data);
                    const resultDiv = document.getElementById("result");

                    const newContent = document.createElement('div');
                    newContent.id = "id" + i;
                    const content1 = contentLists[i][0];
                    const content2 = contentLists[i][1];
                    newContent.textContent = `単語: ${content1}, 意味: ${content2}`;
                    resultDiv.appendChild(newContent);
                }else{
                    // console.error(data);
                }
            });
            document.addEventListener("click", () => {
                
            });
        }
    });
});