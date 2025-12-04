import { BASE_URL } from "../constants";

const getDifficulties = () => {
    return fetch(`${BASE_URL}/difficulty`);
}


const getQuestions = (difficulty) => {
    return fetch(`${BASE_URL}/questions?difficulty=${difficulty}`);
}

const getAnswer = (id, option) => {
    return fetch(`${BASE_URL}/answer`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                questionId: id,
                option: option
        })
    });
}


export default { getDifficulties, getQuestions, getAnswer };