import { signOut } from "next-auth/react";

const Nav = () => {
    return (
        <div className="flex items-center justify-start p-4 bg-gray-800">
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    );
}

export default Nav;