import React from "react";
import Navbar from './Navbar';
import LeftSidebarMenu from './LeftSidebarMenu';

function Layout({ children } : { children : React.ReactNode }) {
	return (
		<div className="h-screen bg-base-200">
			<div className="drawer">
				<input
					id="leftMenuDrawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col">
					<Navbar />
					<div className="flex">
						<aside className="hidden lg:block">
							<LeftSidebarMenu />
						</aside>
                  <main className="p-4 w-full">
                     {children}
                  </main>
					</div>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="leftMenuDrawer"
						className="drawer-overlay"
					></label>
					<LeftSidebarMenu />
				</div>
			</div>
		</div>
	);
}

export default Layout;
