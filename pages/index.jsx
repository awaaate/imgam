import { useEffect, useState } from "react";

import { db } from "../lib/firebase";

import CardList from "../components/card/List";
import { Modal } from "../components/Modal";

import { useSearchContext } from "../lib/SearchContext";
import { LoginModalContextProvider } from "../lib/LoginModalContext";
import { LoginModal } from "../components/LoginModal";

let subscriber = null;
const Index = () => {
    const { search } = useSearchContext();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postsRef = db.collection("posts").orderBy("createdAt", "desc");
        subscriber = postsRef.onSnapshot((snapshot) => {
            const posts = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setPosts(posts);
        });
        return () => {
            subscriber();
        };
    }, []);

    return (
        <LoginModalContextProvider>
            <div className="home-page">
                <Modal />
                <CardList
                    items={posts.filter(
                        (a) => a.caption.toLowerCase().search(search) >= 0
                    )}
                />
            </div>
            <LoginModal />
        </LoginModalContextProvider>
    );
};

export default Index;
