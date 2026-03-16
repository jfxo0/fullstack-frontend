import { Link, Outlet } from "react-router";


 function Layout() {
     return (
         <div className="min-h-screen bg-slate-50 text-slate-900">
             {/* Top navigation */}
             <header className="border-b bg-white">
                 <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                     <Link to="/" className="text-lg font-semibold tracking-tight">
                         My Character List
                     </Link>

                     <nav className="flex items-center gap-3">
                         <Link
                             to="/"
                             className="rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100"
                         >
                             Home
                         </Link>
                         <Link
                             to="/create"
                             className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                         >
                             Create
                         </Link>
                     </nav>
                 </div>
             </header>

             {/* Page content */}
             <main className="mx-auto max-w-6xl px-6 py-8">
                 <Outlet/>
             </main>

             {/* Footer */}
             {/*<footer className="border-t bg-white">*/}
             {/*    <div className="mx-auto max-w-6xl px-6 py-4 text-center text-sm text-slate-500">*/}
             {/*        © {new Date().getFullYear()} My Character List*/}
             {/*    </div>*/}
             {/*</footer>*/}
         </div>
     );
 }

export default Layout;