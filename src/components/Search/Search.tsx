import { useForm } from "react-hook-form";

import icons from "@/assets/icons";
import { SearchFormProp, SearchProps } from "@/types";

import Input from "../Input";

const Search = ({
    id,
    name,
    value,
    onSearch,
    placeholder,
    className,
}: SearchProps) => {
    const { control, handleSubmit } = useForm<SearchFormProp>({
        defaultValues: {
            [name]: value,
        },
    });

    const handleSearch = (value: SearchFormProp) => {
        onSearch(value);
    };

    return (
        <form onSubmit={handleSubmit(handleSearch)}>
            <Input.Text
                id={id}
                name={name}
                control={control}
                icon={icons.search}
                placeholder={placeholder}
                className={className}
            />
        </form>
    );
};

export default Search;
