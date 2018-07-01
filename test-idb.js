openDatabase = () => {

  let countryData = this.props.countries;

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

const DB_NAME = "countryDB";
// Open (or create) the database
var open = indexedDB.open(DB_NAME, 1);

// Create the schema
open.onupgradeneeded = function() {
var db = open.result;
var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
var index = store.createIndex("by-id", "id");
};

open.onsuccess = () => {
// Start a new transaction
var db = open.result;
var tx = db.transaction("MyObjectStore", "readwrite");
var store = tx.objectStore("MyObjectStore");
//var index = store.index("by-");

// Add some data
// store.put({id: 12345, name: {first: "John", last: "Doe"}, age: 42});
// store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});

console.log("Putting more objexts...");
const keyObject = Object.keys(countryData).map((list) => (console.log("Data from Key loop", countryData), store.put(countryData[list])));

console.log("Key Obj: ", keyObject);

// Query the data
// var getJohn = store.get(12345);
// var getBob = index.get(["Smith", "Bob"]);
//
// getJohn.onsuccess = function() {
//     console.log(getJohn.result.name.first);   => "John"
// };
//
// getBob.onsuccess = function() {
//     console.log(getBob.result.name.first);    => "Bob"
// };

// Close the db when the transaction is done
tx.oncomplete = function() {
  db.close();
};
}




    // let countryData = this.props.countries;
    //
    // if (!navigator.serviceWorker) {
    //     return Promise.resolve();
    // }
    // return idb.open('country', 1, (upgradeDb) => {
    //   let store = upgradeDb.createObjectStore('countries', {
    //     keyPath: 'id'
    //   });
    //   store.createIndex('by-id', 'id');
    //
    // });
  }

  // storeIDB = () => {
  //   let countryData = this.props.countries;
  //
  //   this.openDatabase().then((db) => {
  //     if (!db) return;
  //     let tx = db.transaction(['country'], 'readwrite');
  //     const store = tx.objectStore('country');
  //
  //     countryData.forEach((countries) => {
  //       store.put(countries);
  //     })
  //   }
  //
  //   )
  //
  // }
