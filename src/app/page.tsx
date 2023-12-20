"use client";
import { useQuery } from "@tanstack/react-query";
import { publicAxios } from "../utils/axiosConfig";
import { IProduct } from "@/interface";

const Home = () => {
    const { data } = useQuery({
		queryKey: ["products"],
		queryFn: () => publicAxios.get<IProduct>("/product"),
	});

    return (
        <div>
            Home
        </div>
    )
}

export default Home