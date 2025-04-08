import { useState } from "react";


export default function SearchForm({onSubmit}) {

    const [input, setInput] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(input);
        setInput("");
    }


  
    return (
        <>
            <form 
            onSubmit={handleSubmit}
            className="form w-100 px-md-5 d-flex justify-content-center">
                <button type="submit" value="Search" className="border-0 bg-transparent"><i className="bi bi-search"></i></button>
                <input type="text" 
                className="form-control custom-width rounded-4" 
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Search ">

                </input>
            </form>
        </>
    )
}