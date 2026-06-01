import { Link } from "react-router-dom";

export default function NotFoundView() {
    return (
        <>
            <h1>Not Found</h1>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </>
    )
}