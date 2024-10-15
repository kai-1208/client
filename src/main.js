// main.js
import { sendDataToServer } from './class.js';
// const sample = new sample();
var i = 0;
const contentLists = {};

document.addEventListener("DOMContentLoaded", () => {
    // const contentList = [];
    button1.addEventListener("click", function() {
        i++;
        contentLists[i] = [];
        const text1 = document.getElementById("content1");
        const text2 = document.getElementById("content2");
        let message1 = text1.value.replace(/[\s\u3000]/g, "");
        let message2 = text2.value.replace(/[\s\u3000]/g, "");
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
        sendDataToServer(contentLists);
    });
    
});