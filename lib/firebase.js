import firebase from "firebase/app";
import { v4 as uuidv4 } from "uuid";

import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/firebase-storage";

const config = {
    apiKey: "AIzaSyCoMSCzViiSu8imIGoTwj74R4t8IYqXlBk",
    authDomain: "imgam-9f89d.firebaseapp.com",
    databaseURL: "https://imgam-9f89d.firebaseio.com",
    projectId: "imgam-9f89d",
    storageBucket: "imgam-9f89d.appspot.com",
    messagingSenderId: "746937368944",
    appId: "1:746937368944:web:d6049f8f7552f921dccfb5",
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const storage = firebase.storage();
export const auth = firebase.auth();
export const db = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, aditionalData) => {
    if (!userAuth) return;

    const userRef = db.doc(`user/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = userAuth;

        const date = new Date();
        try {
            let newUser = await userRef.set({
                createdAt: date,
                email,
                ...aditionalData,
            });
        } catch (error) {
            console.log("Error creating user profile document: ", error);
        }
    }
    return userRef;
};

export const postImage = async (userId, { image, userName, caption }) => {
    if (!userId) return;
    try {
        const imageRef = storage.ref(`images/${uuidv4()}`);

        await imageRef.put(image);
        const url = await imageRef.getDownloadURL();

        const postRef = db.collection("posts").add({
            user: userId,
            userName,
            image: url,
            likes: [],
            createdAt: Date.now(),
            caption,
        });
    } catch (error) {
        console.log("Error posting an image: ", error);
    }
};
export const likePost = async (postId, userId) => {
    const postRef = db.doc(`posts/${postId}`);
    const snapshot = await postRef.get();
    console.log(snapshot);

    if (snapshot.exists) {
        const data = snapshot.data();
        postRef.set({
            ...data,
            likes: [...data.likes, userId],
        });
    }
};

export const unlikePost = async (postId, userId) => {
    const postRef = db.doc(`posts/${postId}`);
    const snapshot = await postRef.get();

    if (snapshot.exists) {
        const data = snapshot.data();
        postRef.set({
            ...data,
            likes: data.likes.filter((user) => user !== userId),
        });
    }
};

export default firebase;
