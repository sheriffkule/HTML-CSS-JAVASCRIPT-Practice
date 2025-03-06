'use strict';

let notekeeperDB = {};

const initDB = function(){
    const db = localStorage.getItem('notekeeperDB');
    if(db) {
        notekeeperDB = JSON.parse(db)
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

initDB();

export const db = [];