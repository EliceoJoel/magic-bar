import React, { useState } from "react";
import Navbar from './Navbar';
import LeftSidebarMenu from './LeftSidebarMenu';

interface DrawerInfo {
	position: "" | "drawer-end";
	content: JSX.Element;
}

function Layout({ children } : { children : React.ReactNode }) {

	const [drawerInfo, setDrawerInfo] = useState({position: "", content: (<></>)});

	const openDrawer = (drawerInfo: DrawerInfo) => {
		setDrawerInfo(drawerInfo);
	}

	return (
		<div className="h-screen bg-base-200">
			<div className={`drawer ${drawerInfo.position}`}>
				<input
					id="theDrawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content flex flex-col">
					<Navbar openDrawer={openDrawer} />
					<div className="flex h-full overflow-hidden">
						<aside className="hidden lg:block">
							<LeftSidebarMenu />
						</aside>
                  <main className="p-4 w-full overflow-y-auto">
                     {children}
                  </main>
					</div>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="theDrawer"
						className="drawer-overlay"
					></label>
					{drawerInfo.content}
				</div>
			</div>
		</div>
	);
}

export default Layout;
