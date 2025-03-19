'use strict';

import { findNote, findNotebook, findNotebookIndex, findNoteIndex, generateID } from './utils.js';

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

    note(notebookID) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookID);
      return notebook.notes;
    } 
  },

  update: {
    notebook(notebookId, name) {
      readDB();

      const notebook = findNotebook(notekeeperDB, notebookId);
      notebook.name = name;

      writeDB();

      return notebook;
    },

    note(noteId, object) {
      readDB();

      const oldNote = findNote(notekeeperDB, noteId);
      const newNote = Object.assign(oldNote, object);

      writeDB();

      return newNote;
    }
  },

  // delete: {
  //   notebook(notebookId) {
  //     readDB();

  //     const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
  //     notekeeperDB.notebooks.splice(notebookIndex, 1);

  //     writeDB();
  //   },

  //   note(notebookId, noteId) {
  //     readDB();

  //     const notebook = findNotebook(notekeeperDB, notebookId);
  //     const noteIndex = findNoteIndex(notebook, noteId);

  //     notebook.notes.splice(noteIndex, 1);

  //     writeDB();

  //     return notebook.notes;
  //   }
  // }

  delete: {
    notebook(notebookId) {
      const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
      if (notebookIndex !== -1) {
        notekeeperDB.notebooks.splice(notebookIndex, 1);
        writeDB();
      }
    },

    note(notebookId, noteId) {
      const notebook = findNotebook(notekeeperDB, notebookId);
      if (notebook) {
        const noteIndex = findNoteIndex(notebook, noteId);
        if (noteIndex !== -1) {
          notebook.notes.splice(noteIndex, 1);
          writeDB();
          return notebook.notes;
        }
      }
    }
  }
};
