const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogIn = document.getElementById("btnLogIn");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogOut = document.getElementById("btnLogOut");

btnLogIn.addEventListener('click',e=>{
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email,pass);

	promise.catch(e=>console.log(e.message)
					
					);
});

btnSignUp.addEventListener('click',e=>{
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();

	const promise = auth.createUserWithEmailAndPassword(email,pass);

	promise.catch(e=>console.log(e.message));
});

btnLogOut.addEventListener('click',e=>{
	firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		//document.getElementById("btnLogIn").style.display = 'none';
	}
	else{
		console.log("Not logged in");
		document.getElementById("btnLogOut").style.display = 'none';

	}
});

//working with the database

//const remindTitle = document.getElementById('remindTitle');
//const remindText = document.getElementById('remindText');
const remindList = document.getElementById('remindText');

const dbRefObject = firebase.database().ref().child('object');
const dbRefList = dbRefObject.child('hobbies');


dbRefObject.on('value',snap => {
	console.log(snap.val().name);
//	remindText.innerText = JSON.stringify(snap.val().name);
});

dbRefList.on('child_added', snap => {
	console.log(snap.val());
	const li = document.createElement('li');
	li.innerText = snap.val();
	li.id =snap.key;
	remindList.appendChild(li);
	
});

dbRefList.on('child_changed',snap =>{
	const remindTextChanged = document.getElementById(snap.key);
	remindTextChanged.innerText = snap.val();
});

dbRefList.on('child_removed', snap =>{
	const remindTextToRemove = document.getElementById(snap.key);
	remindTextToRemove.remove();
});