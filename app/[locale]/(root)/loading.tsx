"use client"
import Image from "next/image";

const LoadingStore = () => {

    return ( <div className="h-screen flex justify-center items-center">
        <Image src={`/tadpole.svg`} alt="loading" width={50} height={50}/>
    </div> );
}
 
export default LoadingStore;