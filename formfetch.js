$(document).ready( 

    async function() {
        await refreshList();
    }
);

function reload(){
    location.reload();
}

async function refreshList(){
    var pans = await fetch("https://mypanapi.herokuapp.com/pans").then(function (response) {
        return response.json();
    });
    var panTable = document.getElementById("panTable");

    for (var i = 0; i < pans.length; i++) {
        var tr = "<tr>";

        tr += "<td>" + pans[i].id + "</td>" + "<td>" + pans[i].root + "</td>" + "<td>" + pans[i].name + "</td>" + "<td>" + pans[i].notes.join(' ') + "</td>" + "<td>" + pans[i].chords.join(', ') + "</td></tr>";

        panTable.innerHTML += tr;
    }
    $('#tuningsTable').DataTable();
}

async function addPan() {

    var obj = {};
    var root = document.getElementById("root").value;
    var name = document.getElementById("name").value;
    var notes = document.getElementById("notes").value;
    var notesArray = notes.split(' ');
    console.log(notesArray);
    var chords = document.getElementById("chords").value;
    var chordsArray = chords.split(', ');
    console.log(chordsArray);
    obj["root"] = root;
    obj["name"] = name;
    obj["notes"] = notesArray;
    obj["chords"] = chordsArray;
    console.log(obj);
    
   await window.fetch ("https://mypanapi.herokuapp.com/pans", {
    	method: 'post',
    	headers: {'Content-Type' : 'application/json'},
    	body: JSON.stringify(obj)
    })
    .then ( (text) => {
    	// log response text 
    	console.log (text);
        reload();
    })
    .catch ((error) => {
    	console.log ("Error: ", error)
    })
} 

async function updatePan() {
    var id = parseInt(document.getElementById("idUpdate").value);

    if(typeof id === 'number' && !isNaN(id)){
        var obj = {};
   
        var root = document.getElementById("rootUpdate").value;
        var name = document.getElementById("nameUpdate").value;
        var notes = document.getElementById("notesUpdate").value;
        var notesArray = notes.split(' ');
        console.log(notesArray);
        var chords = document.getElementById("chordsUpdate").value;
        var chordsArray = chords.split(', ');
        console.log(chordsArray);
        obj["id"] = id;
        obj["root"] = root;
        obj["name"] = name;
        obj["notes"] = notesArray;
        obj["chords"] = chordsArray;
        console.log(obj);
        
        
            await window.fetch (`https://mypanapi.herokuapp.com/pans/${id}`, {
                method: 'put',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(obj)
            })
            .then ( (text) => {
                // log response text 
                console.log (text);
                reload();
            })
            .catch ((error) => {
                console.log ("Error: ", error)
            })
    } else if(typeof id !== 'number' || isNaN(id)) {
        alert('Please insert a valid ID!');
    }
} 

function deletePan() {

    var id = parseInt(document.getElementById("idDelete").value);
    console.log(typeof id);

    if(typeof id === 'number' && !isNaN(id)){
        var obj = {};
        
        obj["id"] = id;
        console.log(obj);
        
        window.fetch (`https://mypanapi.herokuapp.com/pans/${id}`, {
            method: 'delete'
        }).then(() => {
            reload();
        })

    } else if(typeof id !== 'number' || isNaN(id)) {
        alert('Please insert a valid ID!');
    }
} 