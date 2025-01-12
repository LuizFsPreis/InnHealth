'use client'
import { SearchIcon } from "lucide-react";
import { useApp } from "../../contexts/ctxHome";
import { useState, useEffect } from "react";

export default function SearchBar() {
    const { setSearchParam, setisSearching } = useApp();
    const [inputValue, setInputValue] = useState("");
    const [debouncedValue, setDebouncedValue] = useState(inputValue);

    //-----------------------------------------//
    // Atualiza o timer de otimização da busca //
    //-----------------------------------------//
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 500); 

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    //--------------//
    // Efetua busca //
    //--------------//
    useEffect(() => {
        setSearchParam(debouncedValue);
        setisSearching(true)
    }, [debouncedValue]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="mt-16 flex items-center justify-center">
            <div className="relative w-full max-w-md">
                <input
                    onChange={onChange}
                    value={inputValue}
                    type="text"
                    placeholder="Busque por academias..."
                    className="w-full py-3 pl-10 pr-4 text-lg text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-alternateDark"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="h-6 w-6 text-gray-500" />
                </span>
            </div>
        </div>
    );
}
