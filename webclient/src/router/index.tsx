import { BrowserRouter, Routes, Route, createBrowserRouter, useLocation, Navigate } from "react-router-dom"
// import { MainPage, FormsPage, ErrorPage, LoginPage } from '../pages'
import { useAppDispatch, useAppSelector } from "hooks/storeHook";
import { logout, selectAccount } from "features/account/accountSlice";
import { Suspense, lazy, useEffect } from "react";
import { BigSinner } from "components";
import { decodeJwtToken, isExpired } from "utils/tokenUtils";
import { IndexPage, ReportPage } from "pages";
const MainPage = lazy(() => import('pages').then(module => ({ default: module.MainPage })));
const FormsPage = lazy(() => import('pages').then(module => ({ default: module.FormsPage })));
const ErrorPage = lazy(() => import('pages').then(module => ({ default: module.ErrorPage })));
const LoginPage = lazy(() => import('pages').then(module => ({ default: module.LoginPage })));


//#region protected route
const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();
    const acc = useAppSelector(selectAccount);
    const dispatch = useAppDispatch();

    // let tokenExp = null;
    // let isExp = false;
    // let jwtFromSessionStorage = sessionStorage.getItem('X-TOKEN');
    // if (jwtFromSessionStorage) {
    //     tokenExp = decodeJwtToken(jwtFromSessionStorage);
    //     if (tokenExp) {
    //         isExp = isExpired(tokenExp.exp)
    //     }
    // } else {
    //     dispatch(logout(true));
    // }
    // if (!acc.isAuth || isExp) {
    //     return <Navigate to="/login" state={{ from: location }} replace />
    // }

    return children
}
//#endregion
export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: (<Suspense fallback={<BigSinner />}><IndexPage /></Suspense>),
        errorElement: <ErrorPage />,
    },
    {
        path: "/main",
        element: (<Suspense fallback={<BigSinner />}><MainPage /></Suspense>),
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: (<Suspense fallback={<BigSinner />}><LoginPage /></Suspense>),
    },
    {
        path: "/form/:kato/:id",
        element: (
            (<Suspense fallback={<BigSinner />}>
                <ProtectedRoute>
                    <FormsPage />
                </ProtectedRoute>
            </Suspense>)
        )
    },
    // 
    {
        path: "/reports/:kato?",
        element: (
            (<Suspense fallback={<BigSinner />}>
                <ProtectedRoute>
                    <ReportPage />
                </ProtectedRoute>
            </Suspense>)
        ),
    },
]);