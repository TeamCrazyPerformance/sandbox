/**
 * guestbook.js - 재민's Web 방명록 
 */

"use strict";

const inputBar       = document.querySelector("#comment-input");
const rootDiv        = document.querySelector("#comments");
const submitBtn      = document.querySelector("#submit");

let commentCountEl = document.querySelector("#count");
let commentCount = 0;

// 타임스탬프 
function generateTime() {
    const date  = new Date();
    const year  = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day   = String(date.getDate()).padStart(2, "0");
    const hour  = String(date.getHours()).padStart(2, "0");
    const min   = String(date.getMinutes()).padStart(2, "0");
    const sec   = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

// 익명 사용자명
function generateUserName() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let name = "";
    for (let i = 0; i < 4; i++) {
        name += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return name + "****";
}

// 투표
function handleVote(event) {
    const btn = event.currentTarget;
    const current = parseInt(btn.dataset.count || "0", 10);
    btn.dataset.count = current + 1;
    btn.querySelector(".vote-count").textContent = current + 1;
}

// 댓글 삭제
function deleteComment(event) {
    const commentItem = event.currentTarget.closest(".eachComment");
    if (commentItem) {
        commentItem.remove();
        if (commentCountEl) {
            commentCount = Math.max(0, commentCount - 1);
            commentCountEl.textContent = commentCount;
        }
    }
}

// 투표 버튼 생성 
function createVoteButton(text, type, id) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.dataset.count = "0";

    const textSpan = document.createElement("span");
    textSpan.textContent = text + " ";

    const countSpan = document.createElement("span");
    countSpan.className = "vote-count";
    countSpan.textContent = "0";

    btn.appendChild(textSpan);
    btn.appendChild(countSpan);
    btn.addEventListener("click", handleVote);
    return btn;
}

// 댓글 렌더링
function showComment(commentText) {
    const commentItem = document.createElement("div");
    commentItem.className = "eachComment";
    commentItem.setAttribute("role", "article");

    const nameRow = document.createElement("div");
    nameRow.className = "name";

    const nameText = document.createElement("span");
    nameText.textContent = generateUserName();

    const delBtn = document.createElement("button");
    delBtn.className = "deleteComment";
    delBtn.textContent = "삭제";
    delBtn.setAttribute("aria-label", "댓글 삭제");
    delBtn.addEventListener("click", deleteComment);

    nameRow.appendChild(nameText);
    nameRow.appendChild(delBtn);

    const contentEl = document.createElement("p");
    contentEl.className = "inputValue";
    contentEl.textContent = commentText;

    const timeEl = document.createElement("div");
    timeEl.className = "time";
    timeEl.textContent = generateTime();

    const voteDiv = document.createElement("div");
    voteDiv.className = "voteDiv";
    
    // 이모지 제거 후 텍스트와 v1.0 원래 ID 할당
    voteDiv.appendChild(createVoteButton("좋아요", "up", "voteUp"));
    voteDiv.appendChild(createVoteButton("싫어요", "down", "voteDown"));

    commentItem.appendChild(nameRow);
    commentItem.appendChild(contentEl);
    commentItem.appendChild(timeEl);
    commentItem.appendChild(voteDiv);

    rootDiv.prepend(commentItem);
}

// 댓글 등록 
function submitComment() {
    const text = inputBar.value.trim();
    if (!text) {
        alert("댓글을 입력해주세요!");
        inputBar.focus();
        return;
    }
    showComment(text);
    if (commentCountEl) {
        commentCount++;
        commentCountEl.textContent = commentCount;
    }
    inputBar.value = "";
    inputBar.focus();
}

// 이벤트 등록
if (submitBtn) {
    submitBtn.addEventListener("click", submitComment);
}
if (inputBar) {
    inputBar.addEventListener("keydown", function (e) {
        if (e.key === "Enter") submitComment();
    });
}
