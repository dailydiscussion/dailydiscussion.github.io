importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBjFimVkokS3aASEEy0PU0CwtQUuaYsNcM',
  authDomain: 'daily-discussion.firebaseapp.com',
  projectId: 'daily-discussion',
  messagingSenderId: '960148679301',
  appId: '1:960148679301:web:efb83aaaa6079066d697ec'
});

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Request permission for receiving push notifications
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
  // You can now subscribe to push notifications.
}).catch((err) => {
  console.error('Unable to get permission to notify.', err);
});

// Retrieve the registration token
messaging.getToken().then((currentToken) => {
  if (currentToken) {
    // Send the token to your server to associate it with the user.
    console.log('Token:', currentToken);
  } else {
    console.warn('No registration token available. Request permission to generate one.');
  }
}).catch((err) => {
  console.error('An error occurred while retrieving token. ', err);
});

// Handle incoming push notifications when the app is in the background
messaging.onBackgroundMessage((payload) => {
  console.log('Push notification received:', payload);

  // Extract notification details
  const { title, body, icon } = payload.data;

  // Show the notification
  self.registration.showNotification(title, {
    body: body,
    icon: icon
  });
});