"use client";
import { useSession } from "next-auth/react";
import useSWR from "swr";


export default function ServiceA() {
    const { data: session } = useSession();
    const token = session.accessToken;

    const fetcher = (url) => fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res) => res.json());

    const { data, error, isLoading } = useSWR("http://100.99.192.99:8001/api/data", fetcher);

    if (error) return "An error has occurred.";
    if (isLoading) return "Loading...";

    return (
        <div>
            <h1 className="font-bold text-xl">Service A</h1>
            <div className="mt-2">
                <div className="font-bold">Respons Data From Service A</div>
                {JSON.stringify(data)}
            </div>
        </div>
    );
}
