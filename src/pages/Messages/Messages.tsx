import Container from "@/components/Container";
import { MessageProvider } from "@/contexts/message/MessageContext";

import MessageBox from "./components/MessageBox";
import MessageList from "./components/MessageList";

const Messages = () => {
    return (
        <MessageProvider>
            <section id="app-container" className="messages">
                <Container>
                    <div className="messages__inner">
                        <MessageList />
                        <MessageBox />
                    </div>
                </Container>
            </section>
        </MessageProvider>
    );
};

export default Messages;
