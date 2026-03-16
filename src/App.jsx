import { createBrowserRouter, RouterProvider } from "react-router";
// import je components
import Layout from "./Layout.jsx";
import Characters from "./Characters.jsx";
import Create from "./Create.jsx";
import Edit from "./Edit.jsx";
import CharacterDetail from "./CharacterDetail.jsx";
import Delete from "./Delete.jsx";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Characters />,
            },
            {
                path: "/create",
                element: <Create />,
            },

            {
                path: "/characters/:id",
                element: <CharacterDetail />,
            },
            {
                path: "edit/:id",
                element: <Edit />,
            },
            {
                path: "/delete/:id",
                element: <Delete />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;