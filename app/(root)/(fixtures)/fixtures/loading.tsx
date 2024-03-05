import Image from "next/image";

const LoadingStore = () => {
    return ( <div className="flex justify-center items-center">
        <Image src={"/ring.svg"} alt="loading" width={50} height={50}/>
    </div> );
}
 
export default LoadingStore;