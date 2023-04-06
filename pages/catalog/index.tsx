import Layout from "@/components/Layout";
import React from "react";
import Image from "next/image";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import CocaColaImage from "@/public/cocacola.jpg";

function All() {
	return (
		<Layout>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-xl md:text-2xl">All Catalog</h1>
				<button className="btn btn-primary btn-sm md:btn-md normal-case">
					New product
				</button>
			</div>
			<div className="flex justify-end mb-4">
				<div className="form-control w-[28rem]">
					<div className="input-group input-group-sm md:input-group-md">
						<input
							type="text"
							placeholder="Search in promotions..."
							className="input input-bordered input-sm input-primary w-full max-w-md md:input-md"
						/>
						<button className="btn btn-primary btn-square btn-sm md:btn-md">
							<AiOutlineSearch className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2 className="text-xl mb-2 lg:text-2xl">Promotions</h2>
				<div className="carousel carousel-end gap-4">
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2 className="text-xl mb-2 lg:text-2xl">Combos</h2>
				<div className="carousel carousel-end gap-4">
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2 className="text-xl mb-2 lg:text-2xl">Games</h2>
				<div className="carousel carousel-end gap-4">
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2 className="text-xl mb-2 lg:text-2xl">Categories</h2>
				<div className="carousel carousel-end gap-4">
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mb-4">
				<h2 className="text-xl mb-2 lg:text-2xl">Brands</h2>
				<div className="carousel carousel-end gap-4">
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
					<div className="carousel-item card card-compact bg-base-100 w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/6">
						<figure className="relative">
							<Image alt="coca cola" src={CocaColaImage} />
							<button className="btn btn-circle btn-primary absolute top-2 right-2">
								<AiOutlinePlus className="w-6 h-6" />
							</button>
							<div className="badge badge-sm absolute bottom-2 right-2">
								700 ml
							</div>
						</figure>
						<div className="card-body">
							<h2 className="card-title text-base">Coca cola</h2>
							<p className="font-semibold text-primary">12 Bs.</p>
							<p>The Coca Cola company</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default All;
