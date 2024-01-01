import icons from "@/assets/icons";
import Search from "@/components/Search";
import { SearchFormProp } from "@/types";

import MessageItem from "../MessageItem";

const MessageList = () => {
    const handleSearch = (value: SearchFormProp) => {
        console.log(value);
    };

    return (
        <div className="messages__list">
            <div className="messages__list-heading">
                <Search
                    id="search"
                    name="search"
                    value=""
                    placeholder="Search"
                    className="messages__search"
                    onSearch={handleSearch}
                />

                <div className="messages__wishlist">
                    <img
                        src={icons.starSolid}
                        alt=""
                        className="messages__wishlist-icon messages__wishlist-icon--active"
                    />
                </div>
            </div>

            <div className="messages__content">
                <MessageItem />
            </div>
        </div>
    );
};

export default MessageList;
