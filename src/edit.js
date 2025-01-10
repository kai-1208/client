import { sendDataToServer, fetchDataFromServer, updateDataOnServer } from './class.js';

let i = 0;
let contentLists = {};
let selectedVocabulary = null;

document.addEventListener("DOMContentLoaded", () => {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const text1 = document.getElementById("content1");
    const text2 = document.getElementById("content2");

    // ライトボックスの要素を取得
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close");
    const vocabularyList = document.getElementById("vocabularyList");

    // ライトボックスを表示
    lightbox.style.display = "block";

    // ライトボックスを閉じる
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // ライトボックスの外側をクリックして閉じる
    window.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    const displayData = (data) => {
        const wordDiv = document.getElementById("word");
        const meaningDiv = document.getElementById("meaning");
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

            // クリックイベントを追加して編集可能にする
            wordContent.addEventListener("click", () => handleEdit(content1, index, "単語"));
            meaningContent.addEventListener("click", () => handleEdit(content2, index, "意味"));
        });
    };

    const handleEdit = (content, index, type) => {
        const newContent = prompt(`${type}を編集してください：`, content);
        if (newContent !== null && newContent.trim() !== "") {
            const oldContent = contentLists[index][type === "単語" ? 0 : 1];
            contentLists[index][type === "単語" ? 0 : 1] = newContent;
            updateDataOnServer(contentLists)
            .then(data => {
                if (data.status === "success") {
                    document.getElementById(`${type.toLowerCase()}${index}`).textContent = `${index}: ${newContent}`;
                } else {
                    contentLists[index][type === "単語" ? 0 : 1] = oldContent; // 変更を元に戻す
                }
            })
            .catch(error => {
                console.error("サーバーへの送信中にエラーが発生しました:", error);
                contentLists[index][type === "単語" ? 0 : 1] = oldContent; // 変更を元に戻す
            });
        }
    };

    // ログイン情報を取得
    fetch('/api/login-status')
    .then(response => response.json())
    .then(data => {
        if (data.loggedIn) {
            console.log(`Logged in as: ${data.email}`);
            // ユーザーの単語帳リストを取得
            fetch('/api/vocabulary-list')
            .then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const vocabularies = data.vocabularies;
                    vocabularies.forEach((vocabulary, index) => {
                        const vocabItem = document.createElement('div');
                        vocabItem.textContent = vocabulary.name;
                        vocabItem.addEventListener("click", () => {
                            selectedVocabulary = vocabulary.id;
                            fetchDataFromServer(selectedVocabulary)
                            .then(data => {
                                if (data.status === "success") {
                                    contentLists = data.contentLists;
                                    displayData(Object.values(contentLists));
                                    lightbox.style.display = "none"; // ライトボックスを閉じる
                                } else {
                                    console.error("サーバーからのデータ取得が失敗しました。");
                                }
                            })
                            .catch(error => {
                                console.error("サーバーからのデータ取得中にエラーが発生しました:", error);
                            });
                        });
                        vocabularyList.appendChild(vocabItem);
                    });
                } else {
                    console.error("サーバーからの単語帳リストの取得が失敗しました。");
                }
            })
            .catch(error => {
                console.error("サーバーからの単語帳リストの取得中にエラーが発生しました:", error);
            });
        } else {
            console.log("Not logged in");
            // ログインしていない場合の処理
        }
    })
    .catch(error => {
        console.error("ログイン情報の取得中にエラーが発生しました:", error);
    });

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
        contentLists[i] = [message1.replace(/[\s\u3000]/g, ""), message2.replace(/[\s\u3000]/g, "")];
        console.log(i + ":" + contentLists[i]);

        text1.value = "";
        text2.value = "";

        sendDataToServer(contentLists)
        .then(data => {
            if (data.status === "success") {
                displayData(Object.values(contentLists));
            } else {
                console.error("サーバーからのレスポンスが失敗しました。");
            }
        })
        .catch(error => {
            console.error("サーバーへの送信中にエラーが発生しました:", error);
        });
    });

    button2.addEventListener("click", function() {
        sendDataToServer(contentLists)
        .then(data => {
            if (data.status === "success") {
                contentLists = {};
                displayData([]);
                console.log("単語帳のデータを消去しました。");
                window.location.href = "./index.html"; // リダイレクト
            } else {
                console.error("サーバーからのレスポンスが失敗しました。");
            }
        })
        .catch(error => {
            console.error("サーバーへの送信中にエラーが発生しました:", error);
        });
    });

    const texts = [text1, text2];
    for (let i = 0; i < 2; i++) {
        const current = texts[i];
        const complement = texts[1 - i]; // currentでない方を取得
        current.addEventListener('keydown', (e) => {
            if (e.key !== "Enter") return;
            if (current.value.replace(/[\s\u3000]/g, "") === "") {
                alert("入力してください");
                return;
            } else if (complement.value.replace(/[\s\u3000]/g, "") === "") {
                complement.focus();
            } else {
                button1.click();
            }
        });
    }
});