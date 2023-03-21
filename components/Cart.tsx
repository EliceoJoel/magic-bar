import Image from "next/image";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import CocaColaImage from "@/public/cocacola.jpg";
import { HiMinus, HiPlus } from "react-icons/hi";
import { FiTrash } from "react-icons/fi";

function Cart() {
	return (
		<div className="menu p-4 w-60 ssm:w-80 bg-base-200 md:w-96">
			<div className="mb-4 flex items-center justify-between">
				<h2 className="text-xl">Order items</h2>
				<label htmlFor="theDrawer" className="btn btn-outline btn-circle">
					<IoCloseOutline className="h-6 w-6" />
				</label>
			</div>
			<div className="bg-white rounded-btn mb-2 shadow-lg px-3 py-4 flex">
				<Image
					alt="order 1"
					src={CocaColaImage}
					className="w-20 h-20 mr-2"
				/>
				<div className="flex flex-col justify-between w-full gap-1">
					<p>Coca Cola Zero zero</p>
					<span className="font-semibold">12 Bs.</span>
					<div className="w-24">
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiMinus />
						</button>
						<span className="btn btn-xs btn-ghost">1</span>
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiPlus />
						</button>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-btn mb-2 shadow-lg px-3 py-4 flex">
				<Image
					alt="order 1"
					src={CocaColaImage}
					className="w-20 h-20 mr-2"
				/>
				<div className="flex flex-col justify-between w-full gap-1">
					<p>Coca Cola Zero zero</p>
					<span className="font-semibold">12 Bs.</span>
					<div className="w-24">
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiMinus />
						</button>
						<span className="btn btn-xs btn-ghost">1</span>
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiPlus />
						</button>
					</div>
				</div>
			</div>
			<div className="bg-white rounded-btn mb-2 shadow-lg px-3 py-4 flex">
				<Image
					alt="order 1"
					src={CocaColaImage}
					className="w-20 h-20 mr-2"
				/>
				<div className="flex flex-col justify-between w-full gap-1">
					<p>Coca Cola Zero zero</p>
					<span className="font-semibold">12 Bs.</span>
					<div className="w-24">
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiMinus />
						</button>
						<span className="btn btn-xs btn-ghost">1</span>
						<button className="btn btn-sm btn-circle btn-outline ">
							<HiPlus />
						</button>
					</div>
				</div>
			</div>
			<div className="rounded-btn my-2 flex justify-between">
				<button className="btn btn-circle btn-outline hover:bg-red-500 hover:border-red-500">
					<FiTrash className="w-6 h-6" />
				</button>
				<button className="btn btn-primary flex justify-between w-56 normal-case md:w-72">
					<span>Make order</span>
					<span>36 Bs.</span>
				</button>
			</div>
		</div>
	);
}

export default Cart;
