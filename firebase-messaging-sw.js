importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js')

let firebaseConfig = {
	apiKey: "AIzaSyAVbqSosUmhwpnoXAg5zL9CAC07fN5AL8Q",
      authDomain: "dailydiscussion-aefdf.firebaseapp.com",
      projectId: "dailydiscussion-aefdf",
      storageBucket: "dailydiscussion-aefdf.appspot.com",
      messagingSenderId: "825965290522",
      appId: "1:825965290522:web:72f5f7ee2fa6dedf761da3",
      measurementId: "G-JXX2XV3Y4T"
}
firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('Handling background message:', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
