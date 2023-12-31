import icons from "@/assets/icons";
import Search from "@/components/Search";
import { SearchFormProp } from "@/types";

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

                <div className="messages__list-wishlist">
                    <img src={icons.star} alt="" />
                </div>
            </div>
        </div>
    );
};

export default MessageList;
