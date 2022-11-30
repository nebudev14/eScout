import { NextPage } from "next"
import { useQuery } from "../hooks/trpc";

const Zebra: NextPage = () => {
    const { data, isLoading } = useQuery([
        "zebra.get-match-data",
        { color: "blue", matchId: "2022cmptx_sf1m15", teamNumber: "6328" }
    ])

    // console.log(data)

    return (
        <div className="dark:text-white min-h-screen">
            <h1>ball</h1>
        </div>
    );
}

export default Zebra;