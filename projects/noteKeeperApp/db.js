'use strict';

import { findNotebook, findNotebookIndex, generateID } from './utils.js';

let notekeeperDB = {};

const initDB = function () {
  const db = localStorage.getItem('notekeeperDB');
  if (db) {
    notekeeperDB = JSON.parse(db);
  } else {
    notekeeperDB.notebooks = [];
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
  }
};

const readDB = function () {
  notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
};

const writeDB = function () {
  localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
};

initDB();

export const db = {
  post: {
    notebook(name) {
      readDB();

      const notebookData = {
        id: generateID(),
        name,
        notes: [],
      };

      notekeeperDB.notebooks.push(notebookData);

      writeDB();

      return notebookData;
    },

    note(notebookID, object) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookID);

      const noteData = {
        id: generateID(),
        notebookID,
        ...object,
        postedOn: new Date().getTime()
      }

      notebook.notes.unshift(noteData);
      writeDB();

      return noteData;
    }
  },

  get: {
    notebook() {
      readDB();

      return notekeeperDB.notebooks;
    },
  },

  update: {
    notebook(notebookId, name) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
    },
  },

  delete: {
    notebook(notebookId) {
      readDB();

      const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      notekeeperDB.notebooks.splice(notebookIndex, 1);

      writeDB();
    }
  }
};
