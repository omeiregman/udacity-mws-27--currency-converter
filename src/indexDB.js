import React from 'react';
import { connect } from 'react-redux';
import { fetchCountry } from './actions/countryActions';

export const openDatabase = () => {

      let countryData = this.props.countries;

      // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
      var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

      const DB_NAME = "countryDB";
      // Open (or create) the database
      const open = indexedDB.open(DB_NAME, 1);

      // Create the schema
      open.onupgradeneeded = function() {
        const db = open.result;
        const store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
        const index = store.createIndex("by-id", "id");
      };

      open.onsuccess = () => {
      // Start a new transaction
        const db = open.result;
        const tx = db.transaction("MyObjectStore", "readwrite");
        const store = tx.objectStore("MyObjectStore");
        const index = store.index("by-");


        console.log("Putting more objexts...");
        const keyObject = Object.keys(countryData).map((list) => (console.log("Data from Key loop", countryData), store.put(countryData[list])));

        console.log("Key Obj: ", keyObject);

      tx.oncomplete = function() {
        db.close();
      };
    }

}
