import { INoDataProps } from "@/interfaces/props";
import NoDataImage from "@/public/noDataImage.svg";
import Image from "next/image";

function NoData({message} : INoDataProps) {
	return (
		<div className="p-8 flex items-center flex-col">
			<Image alt="No data" src={NoDataImage} width={250} />
         <p className="text-center mt-4">{message}</p>
		</div>
	);
}

export default NoData;
