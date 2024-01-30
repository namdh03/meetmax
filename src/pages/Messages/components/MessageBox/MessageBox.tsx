import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

const MessageBox = () => {
    return (
        <div className="messages__box">
            <Header />
            <Main />
            <Footer />
        </div>
    );
};

export default MessageBox;
