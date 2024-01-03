import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";

import icons from "@/assets/icons";
import { useDebounce } from "@/hooks";
import { SearchProps } from "@/types";

import Input from "../Input";

const Search = memo(
    ({ id, name, value, onSearch, placeholder, className }: SearchProps) => {
        const { control, watch } = useForm<{ [name: string]: string }>({
            defaultValues: {
                [name]: value,
            },
        });
        const searchWatch = watch(name, value);
        const searchDebounce = useDebounce(searchWatch);

        useEffect(() => {
            onSearch && onSearch(searchDebounce);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchDebounce]);

        return (
            <Input.Text
                id={id}
                name={name}
                control={control}
                icon={icons.search}
                placeholder={placeholder}
                className={className}
            />
        );
    }
);

export default Search;
